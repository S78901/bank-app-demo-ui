const testDataAccounts = [
   {
      "_id":"61560b49d5caabb7725cd118",
      "accountNumber":"209384839893",
      "currentBalance":"4500",
      "availableBalance":"3800",
      "transactions":[
         {
            "timestamp":"2021-10-05T22:03:15.917Z",
            "action":"debit",
            "description":"PAYPAL",
            "amount":"7.80",
            "currency":"GBP"
         },
         {
            "timestamp":"2021-10-03T12:04:11.904Z",
            "action":"credit",
            "description":"MARKETWAGON REFUND",
            "amount":"76.21",
            "currency":"EUR"
         },
         {
            "timestamp":"2021-10-02T23:01:01.113Z",
            "action":"debit",
            "description":"AMAZON",
            "amount":"26.30",
            "currency":"USD"
         }
      ]
   },
   {
      "_id":"615607f04febb346895597d2",
      "accountNumber":"726384839354",
      "currentBalance":"8000",
      "availableBalance":"7600",
      "transactions":[
         {
            "timestamp":"2021-10-05T05:10:33.444Z",
            "action":"debit",
            "description":"TRADER JOES",
            "amount":"30.25",
            "currency":"USD"
         },
         {
            "timestamp":"2021-10-02T22:14:22.466Z",
            "action":"debit",
            "description":"HOME DEPOT",
            "amount":"18.15",
            "currency":"USD"
         },
         {
            "timestamp":"2021-10-01T17:05:20.858Z",
            "action":"credit",
            "description":"CRATE & BARREL REFUND",
            "amount":"16.22",
            "currency":"USD"
         }
      ]
   }
];

export default testDataAccounts;