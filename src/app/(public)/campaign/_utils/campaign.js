[
    {
        "id": {
            "type": "string",
            "operators": [
                "contains",
                "does not contain",
                "is",
                "is not",
                "is empty",
                "is not empty"
            ],
            "label": "ID"
        }
    },
    {
        "Client": {
            "type": "string",
            "operators": [
                "contains",
                "does not contain",
                "is",
                "is not",
                "is empty",
                "is not empty"
            ],
            "label": "Client"
        }
    },
    {
        "Name": {
            "type": "string",
            "operators": [
                "contains",
                "does not contain",
                "is",
                "is not",
                "is empty",
                "is not empty"
            ],
            "label": "Name"
        }
    },
    {
        "Guidelines": {
            "type": "string",
            "operators": [
                "contains",
                "does not contain",
                "is",
                "is not",
                "is empty",
                "is not empty"
            ],
            "label": "Guidelines"
        }
    },
    {
        "CampaignGoals": {
            "type": "array",
            "operators": [
                "has any of",
                "has none of",
                "is empty",
                "is not empty"
            ],
            "values": [
                "Content Generation",
                "Lead Generation",
                "Brand Awareness",
                "Conversions",
                "Community Building",
                "Amazon Reviews"
            ],
            "label": "Campaign Goals"
        }
    },
    {
        "CampaignDescription": {
            "type": "string",
            "operators": [
                "contains",
                "does not contain",
                "is",
                "is not",
                "is empty",
                "is not empty"
            ],
            "label": "Campaign Description"
        }
    },
    {
        "CampaignImage": {
            "type": "images",
            "operators": [
                "is empty",
                "is not empty"
            ],
            "label": "Campaign Image"
        }
    },
    {
        "ImageInspirationGallery": {
            "type": "images",
            "operators": [
                "is empty",
                "is not empty"
            ],
            "label": "Image Inspiration Gallery"
        }
    },
    {
        "VideoInspirationGallery": {
            "type": "images",
            "operators": [
                "is empty",
                "is not empty"
            ],
            "label": "Video Inspiration Gallery"
        }
    },
    {
        "TotalContentEngagement": {
            "type": "number",
            "operators": [
                "equal to",
                "not equal to",
                "is empty",
                "is not empty",
                "greater than",
                "less than",
                "greater than equal to",
                "less than equal to"
            ],
            "label": "Total Content Engagement"
        }
    },
    {
        "CampaignStatus": {
            "type": "string",
            "operators": [
                "contains",
                "does not contain",
                "is",
                "is not",
                "is empty",
                "is not empty"
            ],
            "values": [
                "ACTIVE",
                "UPCOMING",
                "ACCEPTING_PARNTERS",
                "CLOSED",
                "REVIEW_CASE_STUDY",
                "NEEDS_CASE_STUDY",
                "PAUSED",
                "NEEDS_PARTNERS",
                "ONBOARDING_PARTNERS"
            ],
            "label": "Campaign Status"
        }
    },
    {
        "Budget": {
            "type": "number",
            "operators": [
                "equal to",
                "not equal to",
                "is empty",
                "is not empty",
                "greater than",
                "less than",
                "greater than equal to",
                "less than equal to"
            ],
            "label": "Budget"
        }
    },
    {
        "TotalExpense": {
            "type": "number",
            "operators": [
                "equal to",
                "not equal to",
                "is empty",
                "is not empty",
                "greater than",
                "less than",
                "greater than equal to",
                "less than equal to"
            ],
            "label": "Total Expense"
        }
    },
    {
        "CampaignROI": {
            "type": "number",
            "operators": [
                "equal to",
                "not equal to",
                "is empty",
                "is not empty",
                "greater than",
                "less than",
                "greater than equal to",
                "less than equal to"
            ],
            "label": "Campaign ROI"
        }
    },
    {
        "StartDate": {
            "type": "date",
            "operators": [
                "is",
                "is not",
                "is empty",
                "is not empty"
            ],
            "format": "mm/dd/yyyy",
            "label": "Start Date"
        }
    },
    {
        "EndDate": {
            "type": "date",
            "operators": [
                "is",
                "is not",
                "is empty",
                "is not empty"
            ],
            "format": "mm/dd/yyyy",
            "label": "End Date"
        }
    },
    {
        "ProductExpense": {
            "type": "number",
            "operators": [
                "equal to",
                "not equal to",
                "is empty",
                "is not empty",
                "greater than",
                "less than",
                "greater than equal to",
                "less than equal to"
            ],
            "label": "Product Expense"
        }
    },
    {
        "Notes": {
            "type": "string",
            "operators": [
                "contains",
                "does not contain",
                "is",
                "is not",
                "is empty",
                "is not empty"
            ],
            "label": "Notes"
        }
    },
    {
        "contentHQ": {
            "type": "relation",
            "operators": [
                "has any of",
                "has none of",
                "is empty",
                "is not empty"
            ],
            "depth": "ByCampaignsContentHQ.secondId",
            "endpoint": "/content-HQ",
            "label": "Content HQ"
        }
    },
    {
        "stakeholders": {
            "type": "relation",
            "operators": [
                "has any of",
                "has none of",
                "is empty",
                "is not empty"
            ],
            "depth": "ByCampaignsStakeholders.secondId",
            "endpoint": "/stakeholders",
            "label": "Stakeholders"
        }
    },
    {
        "retailPartners": {
            "type": "relation",
            "operators": [
                "has any of",
                "has none of",
                "is empty",
                "is not empty"
            ],
            "depth": "ByCampaignsRetailPartners.secondId",
            "endpoint": "/retail-partners",
            "label": "Retail Partners"
        }
    },
    {
        "proposedPartners": {
            "type": "relation",
            "operators": [
                "has any of",
                "has none of",
                "is empty",
                "is not empty"
            ],
            "depth": "ByCampaignsProposedPartners.secondId",
            "endpoint": "/partner-HQ",
            "label": "Proposed Partners"
        }
    },
    {
        "spaces": {
            "type": "relation",
            "operators": [
                "has any of",
                "has none of",
                "is empty",
                "is not empty"
            ],
            "depth": "ByCampaignsSpaces.secondId",
            "endpoint": "/spaces",
            "label": "Spaces"
        }
    },
    {
        "product": {
            "type": "relation",
            "operators": [
                "has any of",
                "has none of",
                "is empty",
                "is not empty"
            ],
            "depth": "ByProductByCampaign.firstId",
            "endpoint": "/products",
            "label": "Product"
        }
    }
]