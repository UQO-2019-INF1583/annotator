var LocalAjax = (function($, window, undefined) {
    var LocalAjax = function(dispatcher, maxFragmentLength) {
        var that = this;

        var findType = function (entityTypes, type) {
            for (var i = 0; i < entityTypes.length; i++) {
                var entityType = entityTypes[i];
                if (entityType.type === type) {
                    return entityType;
                } else {
                    if (entityType.children && entityType.children.length) {
                        var result = findType(entityType.children, type);
                        if (result !== null){
                            return result;
                        }
                    }
                }
            }
            return null;
        };

        var createAnnotation = function(data){
            var attrs = JSON.parse(data.attributes),
                offsets = JSON.parse(data.offsets),
                e_type = findType(data.collection.entity_types, data.type);
                e_id = "";//Entity or Trigger
            if(!e_type){
                //Trigger
                e_type = data.collection.event_types.find( x => x.type === data.type );
                if(e_type){
                    var trigger_id = "T" + (that.document.triggers.length + 1); //TODO: must absolutely be unique
                    e_id = "E" + (that.document.triggers.length + 1); //TODO: must absolutely be unique
                    data.document.triggers.push([
                        trigger_id,
                        data.type,
                        offsets
                    ]);
                    data.document.events.push([
                        e_id,
                        trigger_id,
                        []
                    ]);
                }
            }else{
                var e_id = "N" + (that.document.entities.length + 1), //TODO: must absolutely be unique
                    new_offsets = splitTooLongFragment(offsets, data, e_id);

                //Entity
                data.document.entities.push([
                    e_id,
                    data.type,
                    new_offsets
                ]);
            }

            for (var key in attrs) {
                if(attrs.hasOwnProperty(key) && attrs[key]){
                    data.document.attributes.push([
                        "A" + (that.document.attributes.length + 1), //TODO: must absolutely be unique,
                        key,
                        e_id,
                        attrs[key]
                    ]);
                }
            }
            if(data.comment.length){
                data.document.comments.push([
                    e_id,
                    "AnnotatorNotes",
                    data.comment
                ]);
            }
            return {
                data: data,
                action: data.action,
                annotations: {
                    "source_files": data.document.source_files,
                    "modifications": data.document.modifications,
                    "normalizations": data.document.normalizations,
                    "text": data.document.text,
                    "entities" : data.document.entities,
                    "attributes": data.document.attributes,
                    "relations": data.document.relations,
                    "triggers": data.document.triggers,
                    "events": data.document.events,
                    "comments": data.document.comments
                },
                edited: [[e_id]],
                messages: [],
                protocol: 1
            };
        };

        // Validate max fragment length based on options.maxFragmentLength
        // Use discontinguity to fix long annotations glitches before calling BRAT rendering engine.
        var splitTooLongFragment = function(offsets, data, e_id){
            var new_offsets = [];

            if(maxFragmentLength > 0 && offsets.find( x => (x[1] - x[0]) > maxFragmentLength)){
                offsets.forEach(function(fragment){
                    var from = fragment[0],
                        to = fragment[1],
                        subtext = data.document.text.substring(from, to);

                    if(to - from > maxFragmentLength) {
                        var from_end = from + (subtext.indexOf(' ')),
                            to_start = to - (subtext.length - (subtext.lastIndexOf(' ') + 1));
                        new_offsets.push([from, from_end ]);
                        new_offsets.push([to_start, to]);

                        // Add special attribute for symbolic representation
                        data.document.attributes.push([
                            "A" + (that.document.attributes.length + 1), //TODO: must absolutely be unique,
                            LONG_ANNOTATION_CONST,
                            e_id,
                            [from,to]
                        ]);
                    }else{
                        new_offsets.push([from, to ]);
                    }
                });
            }else{
                new_offsets = offsets;
            }
            return new_offsets;
        };

        var editAnnotation = function(data){
            var e_type = {}, //Entity or Trigger
                attrs = JSON.parse(data.attributes),
                offsets = JSON.parse(data.offsets);

            //Edit annotation TODO: Validation is based on id, fix this
            if(data.id.substring(0, 1) == "E"){
                //Event annotation
                //data.normalisations ??
                var annotation = data.document.events.find( x => x[0] === data.id );
                var trigger_id = annotation[1];
                var trigger = data.document.triggers.find( x => x[0] === trigger_id );
                trigger[1] = data.type;
                trigger[2] = offsets;
                e_type = data.collection.event_types.find( x => x.type === data.type );
            }else if(data.id.substring(0, 1) == "N"){
                //Entity annotation
                var entity = data.document.entities.find( x => x[0] === data.id );
                entity[1] = data.type;
                entity[2] = splitTooLongFragment(offsets, data, data.id);
                e_type = findType(data.collection.entity_types, data.type);

            }else{
                //TODO: Error
            }
            if(e_type){
                //Removed all attributes for this particular annotation id
                var existing_attrs = data.document.attributes.filter( x => x[2] === data.id);
                existing_attrs.forEach(function(attr){
                    var index = data.document.attributes.indexOf( x => x[0] === attr[0]); //TODO: this always returns -1
                    data.document.attributes.splice(index, 1);
                });

                //Re-add all attributes
                for (var key in attrs) {
                    if(attrs.hasOwnProperty(key) && attrs[key]) {
                        existing_attrs.find(x => x[1] === key);

                        data.document.attributes.push([
                            "A" + (that.document.attributes.length + 1), //TODO: must absolutely be unique,
                            key,
                            data.id,
                            attrs[key]
                        ]);
                    }
                }

                //Add/Edit comment content
                if(data.comment.length){
                    var comment = data.document.comments.find( x => x[0] === data.id);
                    if(comment){
                        //Edit
                        comment[2] = data.comment;
                    }else{
                        //Add
                        data.document.comments.push([
                            data.id,
                            "AnnotatorNotes",
                            data.comment
                        ]);
                    }
                }
                //Comments && Attributes are deactivated for relations at this point

                return {
                    data: data,
                    action: data.action,
                    annotations: {
                        "source_files": data.document.source_files,
                        "modifications": data.document.modifications,
                        "normalizations": data.document.normalizations,
                        "text": data.document.text,
                        "entities" : data.document.entities,
                        "attributes": data.document.attributes,
                        "relations": data.document.relations,
                        "triggers": data.document.triggers,
                        "events": data.document.events,
                        "comments": data.document.comments
                    },
                    edited: [[data.id]],
                    messages: [],
                    protocol: 1
                };
            }else{
                return {}; //TODO: Error handling
            }

        };

        var deleteAnnotation = function (data) {
            // delete the entity. TODO: also delete events etc
            var entities = data.document.entities;
            for (var i = 0; i < entities.length; i++){
                if (entities[i][0] === data.id){  // entity format [id, type, offsets], e.g. ["N1", "Person", Array[2]]
                    entities.splice(i, 1);
                    break;
                }
            }
            // delete relations containing the entity TODO: attributes etc?
            var relations = data.document.relations;
            for (var i = relations.length - 1; i >= 0; i--){
                // relation format: ["R1", "Friend", Array[2]]
                var relation = relations[i][2];  // e.g. [['From', "N1"], ['To', 'N2']]
                if (relation[0][1] === data.id || relation[1][1] === data.id){
                    relations.splice(i, 1);
                }
            }

            return {
                    action: data.action,
                    annotations: data.document,
                    edited: [],
                    messages: [],
                    protocol: 1
                };
        };

        var createRelation = function(data){
            var e_type = data.collection.relation_types.find( x => x.type === data.type ); //Entity or Event

            if(!e_type){
                //Event relation
                /*data.collection.event_types.forEach(function(event){
                    event.arcs.forEach(function(eRelation){
                        if(eRelation.type === data.type){
                            e_type = event;
                            //TODO: Exit loop
                        }
                    })
                });*/
                e_type = data.document.events.find( x => x[0] === data.origin );
                if(e_type){
                    e_type[2].push([
                        data.type,
                        data.target
                    ]);
                }
            }else{
                //Entity relation
                var obj =
                [
                    "R" + (that.document.relations.length + 1), //TODO: must absolutely me unique
                    data.type,
                    [
                        [e_type.args[0].role, data.origin],
                        [e_type.args[1].role, data.target]]
                ];
                data.document.relations.push(obj);
            }
            return {
                action: data.action,
                annotations: {
                    "source_files": data.document.source_files,
                    "modifications": data.document.modifications,
                    "normalizations": data.document.normalizations,
                    "text": data.document.text,
                    "entities" : data.document.entities,
                    "attributes": data.document.attributes,
                    "relations": data.document.relations,
                    "triggers": data.document.triggers,
                    "events": data.document.events
                    //"ctime": 1.0,
                    //"collection": "",
                    //"document": "",
                    //"equivs": [],
                    //"mtime": 1.0,
                    //"sentences_offsets": [],
                    //"token_offsets": [],
                },
                edited: [[data.origin], [data.target]],
                messages: [],
                protocol: 1
            };
        };

        var editRelation = function(data){
            var e_type = data.collection.relation_types.find( x => x.type === data.type ); //Entity or Event

            if(!e_type){
                //Event relation
                e_type = data.document.events.find( x => x[0] === data.origin );
                if(e_type){

                }
            }else{
                //Entity relation
                var relation = data.document.relations.find( x => x[1] === data.old_type && x[2][0][1] === data.origin && x[2][1][1] === data.old_target );
                relation[1] = data.type;
                relation[2] = [
                    [e_type.args[0].role, data.origin],
                    [e_type.args[1].role, data.target]
                ];
            }

            return {
                action: data.action,
                annotations: {
                    "source_files": data.document.source_files,
                    "modifications": data.document.modifications,
                    "normalizations": data.document.normalizations,
                    "text": data.document.text,
                    "entities" : data.document.entities,
                    "attributes": data.document.attributes,
                    "relations": data.document.relations,
                    "triggers": data.document.triggers,
                    "events": data.document.events,
                    "comments": data.document.comments
                },
                edited: [[data.origin], [data.target]],
                messages: [],
                protocol: 1
            };

        };

        var localExecution = function(data, callback, merge) {
            dispatcher.post('spin');
            dispatcher.post('local-ajax-begin', [data]);
            that.collection = data.collection;
            that.document = data.document;
            var response = {};

            switch(data.action){
                case "getDocument":
                    //TODO
                    break;
                case "loadConf":
                    //TODO
                    break;
                case "getCollectionInformation":
                    //TODO
                    break;
                case "createArc":
                    //TODO: Validate model with inputs
                    if(data.old_target || data.old_type){
                        response = editRelation(data);
                    }else{
                        response = createRelation(data);
                    }
                    break;
                case "deleteArc":
                    //TODO
                case "reverseArc":
                    //TODO
                    break;
                case "createSpan":
                    //Edit and Created actions on Entities as well as Triggers(Events)
                    //TODO: Validate model with inputs
                    if(data.id){
                        response = editAnnotation(data);
                    }else{
                        response = createAnnotation(data);
                    }
                    break;
                case "deleteSpan":
                    response = deleteAnnotation(data);
                    break;
                case "deleteFragmentxyz?":
                    //TODO
                    break;
                case "splitSpan":
                    //TODO
                    break;
                case "tag":
                    //TODO ??
                    var obj = {
                        collection: data.collection,
                        document: data.document,
                        tagger: data.tagger
                    };
                case "login":
                case "logout":
                case "whoami":
                case "normGetName":
                case "normSearch":
                case "suggestSpanTypes":
                case "importDocument":
                case "deleteDocument":
                case "deleteCollection":
                case "undo":
                case "normData":
                case "InDocument":
                case "InCollection":
                case "storeSVG":
                case "getDocumentTimestamp":
                case "saveConf":
                    break;
                default:
                    //TODO
                    break;
            }

            dispatcher.post(0, callback, [response]);
            dispatcher.post('local-ajax-done', [response]);
            dispatcher.post('unspin');
        };

        dispatcher.
        on('ajax', localExecution);
    };

    return LocalAjax;
})(jQuery, window);

// BRAT STANDALONE LIBRARY BEGIN
// Browserify export
module.exports = LocalAjax;
// BRAT STANDALONE LIBRARY END
