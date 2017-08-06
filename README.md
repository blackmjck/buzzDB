# BuzzDB #
## A RESTful API interface for the BuzzDB data layer ##

![BuzzDB logo](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAGYCAYAAAAKmoqzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMzU3MDlmMS00M2Y0LTI1NDUtOGMzMy00YjI5MzYxYWU2YzQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVGRkU4RjlBQ0E1MTFFMzhFOTRDNTZEQ0MzRTU1MzgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVGRkU4RjhBQ0E1MTFFMzhFOTRDNTZEQ0MzRTU1MzgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmM3ZTYyNTc0LTdhYzItZDk0NS1iNGNhLTdjNWQ3Y2U0YTQ3MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMzU3MDlmMS00M2Y0LTI1NDUtOGMzMy00YjI5MzYxYWU2YzQiLz4gPC9y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)

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

Currently running as a public-facing API accessible at [https://buzzdb.net](https://buzzdb.net/).
_Note_: The API is currently restricted to HTTPS access only.


*****


## Setup ##

1. Clone the BuzzDB repository on your server

        $ git clone https://github.com/blackmjck/buzzdb.git

2. _(not required if connecting to a remote host)_ Install MongoDB on localhost
3. _(optional)_ Create database `buzz` and collection `words` inside it.
4. _(optional)_ Populate with test data from the samples provided in `mock/buzzwords.js`

        $ node insert.js

5. Install dependencies via npm

        $ cd /path/to/buzzDB
        $ npm install

6. Update `lib/creds.js` with the URL and credentials for your MongoDB connection
7. Start the service

        $ node server.js

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


```javascript
**POST** /word  (with `Content-Type: application/json`)
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


```javascript
**PUT** /word/5325cfcc95b1c9a410824be7  (with `Content-Type: application/json`)
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
    * Linked README.md content to root page requests
* v0.1.1 Remote release (2014-03-17)
    * Added wrapper for local or remote database connections
    * Added credentials storage for configurable database connections
* v0.1.0 Initial release (2014-03-16)
    * Added connectors for MongoDB on localhost
    * Turned on `/word`-based endpoints
    * Stubbed out `/type` and `/phrase` endpoint sets
    * Set up REST responses
