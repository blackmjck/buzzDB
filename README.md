# BuzzDB #
## A RESTful API interface for the BuzzDB data layer ##

![BuzzDB logo](https://www.buzzdb.net/media/logo.png "BuzzDB")

*****

The service stores and retrieves buzzwords as MongoDB documents in the form:

```javascript
{
    _id: "5324a5613725c5181205bac2",
    verb: "Scale",
    noun: "Scalability",
    adj: "Scalable",
    rand: 0.14155110088177025
}
```

Buzzwords may be stored with any or all of the three content fields: `verb`, `noun`, and `adj`. The `_id` and `rand`
fields are generated by the server.

Currently running as a public-facing API accessible at [https://www.buzzdb.net](https://www.buzzdb.net/).
_Note_: The API is currently restricted to HTTPS access only.


*****


## Setup ##

1. Clone the BuzzDB repository on your server

        $ git clone https://bitbucket.org/blackmjck/buzzdb.git

2. _(not required if connecting to a remote host)_ Install MongoDB on localhost
3. _(optional)_ Create database `buzz` and collection `words` inside it.
4. _(optional)_ Populate with test data from the samples provided in `buzzwords.js`

        $ node insert.js

5. Install dependencies via npm

        $ cd /path/to/buzzDB
        $ npm install

6. Update `creds.js` with the URL and credentials for your MongoDB connection
7. Start the service

        $ node index.js

8. Start querying!


*****


# Endpoints #



## **GET** /words ##

#### URL Parameters: ###

Parameter | Description       | Required? | Type    | Values | Default
--------- | ----------------- | --------- | ------- | ------ | -------
random    | Randomize results | no        | Boolean |        | false
perPage   | Max results per page | no     | Integer |        | 0 (no limit)
page      | For pagination    | no        | Integer |        | 1
required  | Specify required fields as comma-separated string values | no  | String  | noun, verb, adj |

#### Sample Request ####

**GET** /words?perPage=5&required=noun,verb,adj

#### Sample Response ####

HTTP Status: 200 - Success

```javascript
{
    status: "RETRIEVED",
    msg: "",
    response: [
        {
            noun: "Acquisition",
            adj: "Acquisitive",
            verb: "Acquire",
            rand: 0.627527741715312,
            _id: "5324a5613725c5181205ba46"
        },
        {
            noun: "Collaboration",
            adj: "Collaborative",
            verb: "Collaborate",
            rand: 0.9478897654917091,
            _id: "5324a5613725c5181205ba5c"
        },
        {
            noun: "Scalability",
            adj: "Scalable",
            verb: "Scale",
            rand: 0.14155110088177025,
            _id: "5324a5613725c5181205bac2"
        },
        {
            noun: "Strategy",
            adj: "Strategic",
            verb: "Strategize",
            rand: 0.3378112295176834,
            _id: "5324a5613725c5181205bacc"
        },
        {
            noun: "A/B Testing",
            adj: "A/B Tested",
            verb: "A/B Test",
            rand: 0.9927790435031056,
            _id: "5324a5613725c5181205ba43"
        }
    ],
    results: 5
}
```



## **GET** /word/:id ##

#### Sample Request ####

**GET** /word/5324a5613725c5181205bacc

#### Sample Response ####

HTTP Status: 200 - Success

```javascript
{
    status: "RETRIEVED",
    msg: "",
    response: [
        {
            noun: "Strategy",
            adj: "Strategic",
            verb: "Strategize",
            rand: 0.3378112295176834,
            _id: "5324a5613725c5181205bacc"
        }
    ],
    results: 1
}
```




## **POST** /word ##

#### Message Body Parameters (as JSON) ###

Parameter | Description       | Required? | Type    | Values | Default
--------- | ----------------- | --------- | ------- | ------ | -------
noun      | Noun form         | No\*      | String  |        |
verb      | Verb form (infinitive) | No\* | String  |        |
adj       | Adjectival form   | No\*      | String  |        |

\* Requests must include at least one of: `noun`, `verb`, or `adj`

#### Sample Request ####

**POST** /word  _(with `Content-Type: application/json`)

```javascript
{
    "noun": "EER Diagram",
    "verb": "EER Diagram"
}
```

#### Sample Response ####

HTTP Status: 201 - Created

```javascript
{
    status: "CREATED",
    msg: "",
    response: [
        {
            _id: "5325cfcc95b1c9a410824be7",
            noun: "EER Diagram",
            rand: 0.6104816475417465,
            verb: "EER Diagram"
        }
    ],
    results: 1
}
```




## **PUT** /word/:id ##

#### Message Body Parameters (as JSON) ###

Parameter | Description       | Required? | Type    | Values | Default
--------- | ----------------- | --------- | ------- | ------ | -------
noun      | Noun form         | No\*      | String  |        |
verb      | Verb form (infinitive) | No\* | String  |        |
adj       | Adjectival form   | No\*      | String  |        |

\* Requests must include at least one of: `noun`, `verb`, or `adj`

#### Sample Request ####

**PUT** /word/5325cfcc95b1c9a410824be7  _(with `Content-Type: application/json`)

```javascript
{
    "adj": "EER Diagrammed"
}
```

#### Sample Response ####

HTTP Status: 200 - Success

```javascript
{
    status: "UPDATED",
    msg: "",
    response: [
        {
            _id: "5325cfcc95b1c9a410824be7",
            adj: "EER Diagrammed"
            noun: "EER Diagram",
            rand: 0.6104816475417465,
            verb: "EER Diagram"
        }
    ],
    results: 1
}
```




## **DELETE** /word/:id ##

#### Sample Request ####

**DELETE** /word/5324a5613725c5181205bacc

#### Sample Response ####

HTTP Status: 200 - Success

```javascript
{
    status: "DELETED",
    msg: "",
    response: [
        {
            noun: "Strategy",
            adj: "Strategic",
            verb: "Strategize",
            rand: 0.3378112295176834,
            _id: "5324a5613725c5181205bacc"
        }
    ],
    results: 1
}
```



*****


### Changelog ###
* v0.1.2 Informed release (2014-03-26)
    * Added EJS template support for static views
    * Linked README.md content to root page reqeusts
* v0.1.1 Remote release (2014-03-17)
    * Added wrapper for local or remote database connections
    * Added credentials storage for configurable database connections
* v0.1.0 Initial release (2014-03-16)
    * Added connectors for MongoDB on localhost
    * Turned on `/word`-based endpoints
    * Stubbed out `/type` and `/phrase` endpoint sets
    * Set up REST responses