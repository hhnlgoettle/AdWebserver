define({ "api": [
  {
    "version": "1.0.1",
    "group": "AdRequest",
    "type": "POST",
    "url": "/adrequest/:appId/:displayBlockId",
    "title": "",
    "name": "Request_an_Ad",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appId",
            "description": "<p>the AppId for which ad is requested</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "displayBlockId",
            "description": "<p>the DisplayBlockId for which ad is requested</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Object[]",
            "optional": false,
            "field": "cachedCreatives",
            "description": "<p>cached Creatives by the entity requesting the ad</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "cachedCreatives.id",
            "description": "<p>id of cached creative</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "cachedCreatives.timestamp",
            "description": "<p>timestamp of cached creative</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "appId",
            "description": "<p>id of the app</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "displayBlockId",
            "description": "<p>id of the display block</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaignId",
            "description": "<p>id of campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "impressionId",
            "description": "<p>id of impression. used later to post data</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "cached",
            "description": "<p>indicates if creative is cached by user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "creativeTimestamp",
            "description": "<p>timestamp of the creative</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "downloadUrls",
            "description": "<p>all files to be downloaded</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "downloadUrls.url",
            "description": "<p>one file's url</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "downloadUrls.filename",
            "description": "<p>one file's filename</p>"
          }
        ]
      }
    },
    "filename": "src/router/AdRequestRouter.js",
    "groupTitle": "AdRequest"
  },
  {
    "version": "1.0.1",
    "group": "Admin",
    "type": "GET",
    "url": "/admin/login",
    "title": "Login as an Admin",
    "name": "Login_as_an_Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>BasicAuth (username:password)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>the JWT token used to authenticate</p>"
          }
        ]
      }
    },
    "filename": "src/router/AdminRouter.js",
    "groupTitle": "Admin"
  },
  {
    "version": "1.0.1",
    "group": "Admin",
    "type": "GET",
    "url": "/admin/register",
    "title": "Register as an Admin",
    "name": "Register_as_an_Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>BasicAuth (username:password)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "user.confirmed",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.userId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.id",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>admin accunt has to be manually confirmed in the database by setting the field &quot;confirmed&quot; to true</p>",
    "filename": "src/router/AdminRouter.js",
    "groupTitle": "Admin"
  },
  {
    "version": "1.0.1",
    "group": "Advertiser",
    "type": "POST",
    "url": "/advertiser/campaign",
    "title": "",
    "name": "Create_a_campaign",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the campaigns name</p>"
          },
          {
            "group": "Request Body",
            "type": "String[]",
            "optional": false,
            "field": "tags",
            "description": "<p>tags for the campaign</p>"
          },
          {
            "group": "Request Body",
            "type": "String[]",
            "optional": false,
            "field": "blocked",
            "description": "<p>which tags this campaign blocks</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": false,
            "field": "length",
            "description": "<p>the length of the ad in seconds</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "campaign",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign._id",
            "description": "<p>the campaigns id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.owner",
            "description": "<p>id of customer who owns this campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "campaign.length",
            "description": "<p>length in seconds of campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.url",
            "description": "<p>url from which creative can be downloaded.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.creativeTimestamp",
            "description": "<p>timestamp when creative was uploaded.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "campaign.tags",
            "description": "<p>tags to describe this campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "campaign.blocked",
            "description": "<p>blocked tags by this campaign</p>"
          }
        ]
      }
    },
    "filename": "src/router/AdvertiserRouter.js",
    "groupTitle": "Advertiser"
  },
  {
    "version": "1.0.1",
    "group": "Advertiser",
    "type": "GET",
    "url": "/advertiser/campaign/:campaignId",
    "title": "",
    "name": "Create_a_campaign",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "campaignId",
            "description": "<p>the campaign to update</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "campaign",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign._id",
            "description": "<p>the campaigns id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.owner",
            "description": "<p>id of customer who owns this campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "campaign.length",
            "description": "<p>length in seconds of campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.url",
            "description": "<p>url from which creative can be downloaded.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.creativeTimestamp",
            "description": "<p>timestamp when creative was uploaded.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "campaign.tags",
            "description": "<p>tags to describe this campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "campaign.blocked",
            "description": "<p>blocked tags by this campaign</p>"
          }
        ]
      }
    },
    "filename": "src/router/AdvertiserRouter.js",
    "groupTitle": "Advertiser"
  },
  {
    "version": "1.0.1",
    "group": "Advertiser",
    "type": "PATCH",
    "url": "/advertiser/campaign/:campaignId",
    "title": "",
    "name": "Update_a_campaign",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "campaignId",
            "description": "<p>the campaign to update</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the campaigns name</p>"
          },
          {
            "group": "Request Body",
            "type": "String[]",
            "optional": false,
            "field": "tags",
            "description": "<p>tags for the campaign</p>"
          },
          {
            "group": "Request Body",
            "type": "String[]",
            "optional": false,
            "field": "blocked",
            "description": "<p>which tags this campaign blocks</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": false,
            "field": "length",
            "description": "<p>the length of the ad in seconds</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "campaign",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign._id",
            "description": "<p>the campaigns id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.owner",
            "description": "<p>id of customer who owns this campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "campaign.length",
            "description": "<p>length in seconds of campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.url",
            "description": "<p>url from which creative can be downloaded.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.creativeTimestamp",
            "description": "<p>timestamp when creative was uploaded.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "campaign.tags",
            "description": "<p>tags to describe this campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "campaign.blocked",
            "description": "<p>blocked tags by this campaign</p>"
          }
        ]
      }
    },
    "filename": "src/router/AdvertiserRouter.js",
    "groupTitle": "Advertiser"
  },
  {
    "version": "1.0.1",
    "group": "Advertiser",
    "type": "POST",
    "url": "/advertiser/campaign/:campaignId/creative/upload",
    "title": "",
    "name": "Upload_creative_for_campaign",
    "description": "<p> content-type has to be multipart/formdata</p> <p>each file's key in form-data has to be \"creative\"</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "defaultValue": "multipart/form-data;",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request Body form-data": [
          {
            "group": "Request Body form-data",
            "type": "Object[]",
            "optional": false,
            "field": "files",
            "description": "<p>the creative</p>"
          },
          {
            "group": "Request Body form-data",
            "type": "String",
            "optional": false,
            "field": "files.key",
            "defaultValue": "creative",
            "description": ""
          },
          {
            "group": "Request Body form-data",
            "type": "Object[]",
            "optional": false,
            "field": "files.value",
            "description": "<p>path to file</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "campaign",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign._id",
            "description": "<p>the campaigns id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.owner",
            "description": "<p>id of customer who owns this campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "campaign.length",
            "description": "<p>length in seconds of campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.url",
            "description": "<p>url from which creative can be downloaded.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.creativeTimestamp",
            "description": "<p>timestamp when creative was uploaded.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "campaign.tags",
            "description": "<p>tags to describe this campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "campaign.blocked",
            "description": "<p>blocked tags by this campaign</p>"
          }
        ]
      }
    },
    "filename": "src/router/AdvertiserRouter.js",
    "groupTitle": "Advertiser"
  },
  {
    "version": "1.0.1",
    "group": "Advertiser",
    "type": "DELETE",
    "url": "/advertiser/campaign/:campaignId/creative/delete",
    "title": "",
    "name": "delete_creative_for_campaign",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "deletedFiles",
            "description": "<p>Number of files deleted</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "campaign",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign._id",
            "description": "<p>the campaigns id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.owner",
            "description": "<p>id of customer who owns this campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "campaign.length",
            "description": "<p>length in seconds of campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.url",
            "defaultValue": "null",
            "description": "<p>url from which creative can be downloaded.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaign.creativeTimestamp",
            "defaultValue": "null",
            "description": "<p>timestamp when creative was uploaded.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "campaign.tags",
            "description": "<p>tags to describe this campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "campaign.blocked",
            "description": "<p>blocked tags by this campaign</p>"
          }
        ]
      }
    },
    "filename": "src/router/AdvertiserRouter.js",
    "groupTitle": "Advertiser"
  },
  {
    "version": "1.0.1",
    "group": "Advertiser",
    "type": "GET",
    "url": "/advertiser/campaign",
    "title": "",
    "name": "get_all_campaigns_from_a_customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "campaigns",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaigns._id",
            "description": "<p>the campaigns id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaigns.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaigns.owner",
            "description": "<p>id of customer who owns this campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "campaigns.length",
            "description": "<p>length in seconds of campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaigns.url",
            "description": "<p>url from which creative can be downloaded. only set if creative is uploaded</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "campaigns.creativeTimestamp",
            "description": "<p>timestamp when creative was uploaded. only set when creative is uploaded</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "campaigns.tags",
            "description": "<p>tags to describe this campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "campaigns.blocked",
            "description": "<p>blocked tags by this campaign</p>"
          }
        ]
      }
    },
    "filename": "src/router/AdvertiserRouter.js",
    "groupTitle": "Advertiser"
  },
  {
    "version": "1.0.1",
    "group": "Customer",
    "type": "GET",
    "url": "/customer/register",
    "title": "Register as an Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>BasicAuth (username:password)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role",
            "description": "<p>&quot;customer&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "user.confirmed",
            "description": "<p>true</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>unique id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>your username</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.customerId",
            "description": "<p>sequential id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.id",
            "description": "<p>unique id, same as _id</p>"
          }
        ]
      }
    },
    "description": "<p>Creates a customer. Customer is manually confirmed</p>",
    "filename": "src/router/CustomerRouter.js",
    "groupTitle": "Customer",
    "name": "GetCustomerRegister"
  },
  {
    "version": "1.0.1",
    "group": "Customer",
    "type": "GET",
    "url": "/customer/login",
    "title": "Login as an Customer",
    "name": "Login_as_an_Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>BasicAuth (username:password)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>the JWT token used to authenticate</p>"
          }
        ]
      }
    },
    "filename": "src/router/CustomerRouter.js",
    "groupTitle": "Customer"
  },
  {
    "version": "1.0.1",
    "group": "Impression",
    "type": "GET",
    "url": "/impression/app/:appId/displayBlock/:displayBlockId",
    "title": "",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          }
        ]
      }
    },
    "name": "Get_Impressions_for_a_single_displayBlock",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appId",
            "description": "<p>the id of the app</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "displayBlockId",
            "description": "<p>the id of the displayBlock</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "impressions",
            "description": "<p>array of impressions</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "impressions.displayBlockId",
            "description": "<p>id of the display block</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "impressions.campaignId",
            "description": "<p>id of campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "impressions._id",
            "description": "<p>id of impression. used later to post data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "impressions.data",
            "description": "<p>data collected during impression</p>"
          }
        ]
      }
    },
    "filename": "src/router/ImpressionRouter.js",
    "groupTitle": "Impression"
  },
  {
    "version": "1.0.1",
    "group": "Impression",
    "type": "GET",
    "url": "/impression/app/:appId",
    "title": "",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          }
        ]
      }
    },
    "name": "Get_Impressions_for_app",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appId",
            "description": "<p>the id of the app</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "impressions",
            "description": "<p>array of impressions</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "impressions.displayBlockId",
            "description": "<p>id of the display block</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "impressions.campaignId",
            "description": "<p>id of campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "impressions._id",
            "description": "<p>id of impression. used later to post data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "impressions.data",
            "description": "<p>data collected during impression</p>"
          }
        ]
      }
    },
    "filename": "src/router/ImpressionRouter.js",
    "groupTitle": "Impression"
  },
  {
    "version": "1.0.1",
    "group": "Impression",
    "type": "GET",
    "url": "/impression/campaign/:campaignId",
    "title": "",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          }
        ]
      }
    },
    "name": "Get_Impressions_for_campaign",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "campaignId",
            "description": "<p>the id of the campaign</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "impressions",
            "description": "<p>array of impressions</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "impressions.displayBlockId",
            "description": "<p>id of the display block</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "impressions.campaignId",
            "description": "<p>id of campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "impressions._id",
            "description": "<p>id of impression. used later to post data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "impressions.data",
            "description": "<p>data collected during impression</p>"
          }
        ]
      }
    },
    "filename": "src/router/ImpressionRouter.js",
    "groupTitle": "Impression"
  },
  {
    "version": "1.0.1",
    "group": "Impression",
    "type": "POST",
    "url": "/impression/:impressionId",
    "title": "",
    "name": "Post_Impression_Data",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "impressionId",
            "description": "<p>the id of the impression</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>all impression data under this key</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "impression",
            "description": "<p>the impression</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "impression.displayBlockId",
            "description": "<p>id of the display block</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "impression.campaignId",
            "description": "<p>id of campaign</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "impression._id",
            "description": "<p>id of impression. used later to post data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "impression.data",
            "description": "<p>data collected during impression</p>"
          }
        ]
      }
    },
    "filename": "src/router/ImpressionRouter.js",
    "groupTitle": "Impression"
  },
  {
    "version": "1.0.1",
    "group": "Publisher",
    "type": "POST",
    "url": "/publisher/app",
    "title": "",
    "name": "Create_an_app",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the app's name</p>"
          },
          {
            "group": "Request Body",
            "type": "String[]",
            "optional": false,
            "field": "tags",
            "description": "<p>tags for the app</p>"
          },
          {
            "group": "Request Body",
            "type": "String[]",
            "optional": false,
            "field": "blocked",
            "description": "<p>which tags this app blocks</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": false,
            "field": "maxLength",
            "description": "<p>maximum Length of Creatives</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "app",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app._id",
            "description": "<p>the campaigns id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.owner",
            "description": "<p>id of customer who owns this app</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "app.maxLength",
            "description": "<p>length in seconds of app</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "app.displayBlocks",
            "description": "<p>displayBlocks of this app</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks.type",
            "defaultValue": "interactionRewardingAd",
            "description": "<p>type of this displayBlock</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks._id",
            "description": "<p>id of this displayBlock</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks.name",
            "description": "<p>name of this display block</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "app.tags",
            "description": "<p>tags to describe this app</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "app.blocked",
            "description": "<p>blocked tags by this app</p>"
          }
        ]
      }
    },
    "filename": "src/router/PublisherRouter.js",
    "groupTitle": "Publisher"
  },
  {
    "version": "1.0.1",
    "group": "Publisher",
    "type": "POST",
    "url": "/publisher/app/:appId/displayblock",
    "title": "",
    "name": "Create_an_app",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appId",
            "description": "<p>the app's id</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the displayBlock's name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "app",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app._id",
            "description": "<p>the campaigns id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.owner",
            "description": "<p>id of customer who owns this app</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "app.maxLength",
            "description": "<p>length in seconds of app</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "app.displayBlocks",
            "description": "<p>displayBlocks of this app</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks.type",
            "defaultValue": "interactionRewardingAd",
            "description": "<p>type of this displayBlock</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks._id",
            "description": "<p>id of this displayBlock</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks.name",
            "description": "<p>name of this display block</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "app.tags",
            "description": "<p>tags to describe this app</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "app.blocked",
            "description": "<p>blocked tags by this app</p>"
          }
        ]
      }
    },
    "filename": "src/router/PublisherRouter.js",
    "groupTitle": "Publisher"
  },
  {
    "version": "1.0.1",
    "group": "Publisher",
    "type": "PATCH",
    "url": "/publisher/app/:appId/displayblock/:displayBlockId",
    "title": "",
    "name": "Create_an_app",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appId",
            "description": "<p>the app's id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "displayBlockId",
            "description": "<p>the app's id</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the displayBlock's name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "app",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app._id",
            "description": "<p>the campaigns id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.owner",
            "description": "<p>id of customer who owns this app</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "app.maxLength",
            "description": "<p>length in seconds of app</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "app.displayBlocks",
            "description": "<p>displayBlocks of this app</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks.type",
            "defaultValue": "interactionRewardingAd",
            "description": "<p>type of this displayBlock</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks._id",
            "description": "<p>id of this displayBlock</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks.name",
            "description": "<p>name of this display block</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "app.tags",
            "description": "<p>tags to describe this app</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "app.blocked",
            "description": "<p>blocked tags by this app</p>"
          }
        ]
      }
    },
    "filename": "src/router/PublisherRouter.js",
    "groupTitle": "Publisher"
  },
  {
    "version": "1.0.1",
    "group": "Publisher",
    "type": "GET",
    "url": "/publisher/app",
    "title": "",
    "name": "Get_all_apps",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "apps",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps._id",
            "description": "<p>the campaigns id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.owner",
            "description": "<p>id of customer who owns this app</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "apps.maxLength",
            "description": "<p>length in seconds of app</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "apps.displayBlocks",
            "description": "<p>displayBlocks of this app</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.displayBlocks.type",
            "defaultValue": "interactionRewardingAd",
            "description": "<p>type of this displayBlock</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.displayBlocks._id",
            "description": "<p>id of this displayBlock</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "apps.displayBlocks.name",
            "description": "<p>name of this display block</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "apps.tags",
            "description": "<p>tags to describe this app</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "apps.blocked",
            "description": "<p>blocked tags by this app</p>"
          }
        ]
      }
    },
    "filename": "src/router/PublisherRouter.js",
    "groupTitle": "Publisher"
  },
  {
    "version": "1.0.1",
    "group": "Publisher",
    "type": "GET",
    "url": "/publisher/app:/appId",
    "title": "",
    "name": "Get_an_app_by_its_id",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appId",
            "description": "<p>the app's id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "app",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app._id",
            "description": "<p>the campaigns id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.owner",
            "description": "<p>id of customer who owns this app</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "app.maxLength",
            "description": "<p>length in seconds of app</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "app.displayBlocks",
            "description": "<p>displayBlocks of this app</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks.type",
            "defaultValue": "interactionRewardingAd",
            "description": "<p>type of this displayBlock</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks._id",
            "description": "<p>id of this displayBlock</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks.name",
            "description": "<p>name of this display block</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "app.tags",
            "description": "<p>tags to describe this app</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "app.blocked",
            "description": "<p>blocked tags by this app</p>"
          }
        ]
      }
    },
    "filename": "src/router/PublisherRouter.js",
    "groupTitle": "Publisher"
  },
  {
    "version": "1.0.1",
    "group": "Publisher",
    "type": "PATCH",
    "url": "/publisher/app:/appId",
    "title": "",
    "name": "Update_an_app",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>JWT_Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appId",
            "description": "<p>the app's id</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the app's name</p>"
          },
          {
            "group": "Request Body",
            "type": "String[]",
            "optional": false,
            "field": "tags",
            "description": "<p>tags for the app</p>"
          },
          {
            "group": "Request Body",
            "type": "String[]",
            "optional": false,
            "field": "blocked",
            "description": "<p>which tags this app blocks</p>"
          },
          {
            "group": "Request Body",
            "type": "Number",
            "optional": false,
            "field": "maxLength",
            "description": "<p>maximum Length of Creatives</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "app",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app._id",
            "description": "<p>the campaigns id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.owner",
            "description": "<p>id of customer who owns this app</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "app.maxLength",
            "description": "<p>length in seconds of app</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "app.displayBlocks",
            "description": "<p>displayBlocks of this app</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks.type",
            "defaultValue": "interactionRewardingAd",
            "description": "<p>type of this displayBlock</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks._id",
            "description": "<p>id of this displayBlock</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "app.displayBlocks.name",
            "description": "<p>name of this display block</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "app.tags",
            "description": "<p>tags to describe this app</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "app.blocked",
            "description": "<p>blocked tags by this app</p>"
          }
        ]
      }
    },
    "filename": "src/router/PublisherRouter.js",
    "groupTitle": "Publisher"
  },
  {
    "version": "1.0.1",
    "group": "Tags",
    "type": "GET",
    "url": "/tags",
    "title": "Get Tag list",
    "name": "Receive_List_of_known_tags",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "tags",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tags.name",
            "description": "<p>the tag name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tags.description",
            "description": "<p>the tag's description</p>"
          }
        ]
      }
    },
    "description": "<p>returns a list of all tags</p>",
    "filename": "src/router/TagRouter.js",
    "groupTitle": "Tags"
  }
] });
