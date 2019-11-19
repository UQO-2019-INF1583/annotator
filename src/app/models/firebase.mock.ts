// firestore mock

const docData = {
  Users: {
    "uid_visitor1": {
      "uid": "uid_visitor1",
      "role": 0,
      "firstname": "Victor",
      "lastname": "Visitor1",
      "email": "Visitor1@gmail.com"
    },
    "uid_visitor2": {
      "uid": "uid_visitor2",
      "role": 0,
      "firstname": "Victor",
      "lastname": "Visitor2",
      "email": "Visitor2@gmail.com"
    },
    "uid_member1": {
      "uid": "uid_member1",
      "role": 1,
      "firstname": "Marc",
      "lastname": "Member1",
      "email": "Member1@gmail.com"
    },
    "uid_member2": {
      "uid": "uid_member2",
      "role": 1,
      "firstname": "Marc",
      "lastname": "Member2",
      "email": "Member2@gmail.com"
    },
    "uid_admin1": {
      "uid": "uid_admin1",
      "role": 2,
      "firstname": "Antoine",
      "lastname": "Admin11",
      "email": "Admin11@gmail.com"
    },
    "uid_admin2": {
      "uid": "uid_admin2",
      "role": 2,
      "firstname": "Antoine",
      "lastname": "Admin2",
      "email": "Admin2@gmail.com"
    }
  },
  "Projects": {
    "uid_project1": {
      "events": [],
      "title": "Test",
      "description": "Project used by tests",
      "annotators": [
        "uid_admin1"
      ],
      "entities": [],
      "corpus": [],
      "admin": [
        "uid_admin1"
      ],
      "attributes": [],
      "relations": [],
      "id": "uid_project1"
    },
  }
}