# BuzzDB #
## A RESTful API interface for the BuzzDB data layer ##

The service stores and retrieves buzzwords as MongoDB documents in the form:

    :::javascript
    {
        _id: "5324a5613725c5181205bac2",
        verb: "Scale",
        noun: "Scalability",
        adj: "Scalable",
        rand: 0.14155110088177025
    }

Buzzwords may be stored with any or all of the three content fields: `verb`, `noun`, and `adj`. The `_id` and `rand`
fields are generated by the server.


## Without further ado, the endpoints! ##

### **GET** /words ###

#### URL Parameters: ###

Parameter | Description       | Required? | Type    | Values | Default
--------- | ----------------- | --------- | ------- | ------ | -------
random    | Randomize results | no        | Boolean |        | false
perPage   | Max results per page | no     | Integer |        | 0 (no limit)
page      | For pagination    | no        | Integer |        | 1
required  | Specify required fields | no  | String  | noun, verb, adj |

#### Sample Response ####

**GET** /words?perPage=5&required=noun,verb,adj

    :::javascript
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



### Changelog ###
* v0.1.0 Initial release
    * Added connectors for MongoDB on localhost
    * Turned on `/word`-based endpoints
    * Set up REST responses