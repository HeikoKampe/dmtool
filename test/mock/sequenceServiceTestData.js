// collection of test data for unit testing

angular.module('mdToolApp')
  .value('sequenceServiceTestData',

  {
    completeSingleSequence: [
      {
        properties: {
          visible: false,
          showStopsInTable: false,
          matchingStatus: 'matched',
          departureTime: '04:08',
          tripKey: 123,
          tripLabel: '4_N404-H  04:08',
          blockLabel: 'Linie 004   Kurs 09',
          blockKey: '123'
        },
        data: {
          "cntTripKey": 123,
          "rawStartDate": 1388544730000,
          "vehicleCode": "2581",
          "vehicleLabel": "Strab 232 581",
          "rawId": 62707, "rawStopId": 3,
          "arrival": 1388545803000,
          "departure": 1388545819000,
          "latitude": 51.00889666666667,
          "longitude": 13.802945,
          "distance": 492,
          "status": 1,
          "hasCntStop": "Y",
          "cntStopKey": 60468997,
          "sclTripLabel": "4_N404-H  04:08",
          "sclTripLabelShort": "11_73074\r",
          "sclBlockLabel": "Linie 004   Kurs 09",
          "sclBlockLabelShort": null,
          "sclBlockKey": '123',
          "cntSequence": 2,
          "departureAsString": "2014-01-01 04:10:19",
          "arrivalAsString": "2014-01-01 04:10:03",
          "rawStartDateAsString": "2014-01-01 03:52:10"
        }
      }
    ],

    completeMixedEntries: [
      {"someSplitKey": 1, "rawStartDate": 1388544730000, "vehicleCode": "2581", "vehicleLabel": "Strab 232 581", "rawId": 62707, "rawStopId": 1, "arrival": 1388545336000, "departure": 1388545336000, "latitude": 0.0, "longitude": 0.0, "distance": -1, "status": 1, "hasCntStop": "N", "cntStopKey": null, "sclTripLabel": null, "sclTripLabelShort": null, "sclBlockLabel": null, "sclBlockLabelShort": null, "cntSequence": null, "departureAsString": "2014-01-01 04:02:16", "arrivalAsString": "2014-01-01 04:02:16", "rawStartDateAsString": "2014-01-01 03:52:10"},
      {"someSplitKey": 2, "rawStartDate": 1388544730000, "vehicleCode": "2581", "vehicleLabel": "Strab 232 581", "rawId": 62707, "rawStopId": 2, "arrival": 1388545349000, "departure": 1388545697000, "latitude": 0.0, "longitude": 0.0, "distance": 31, "status": 1, "hasCntStop": "N", "cntStopKey": null, "sclTripLabel": null, "sclTripLabelShort": null, "sclBlockLabel": null, "sclBlockLabelShort": null, "cntSequence": null, "departureAsString": "2014-01-01 04:08:17", "arrivalAsString": "2014-01-01 04:02:29", "rawStartDateAsString": "2014-01-01 03:52:10"},
      {"someSplitKey": 2, "rawStartDate": 1388544730000, "vehicleCode": "2581", "vehicleLabel": "Strab 232 581", "rawId": 62707, "rawStopId": 3, "arrival": 1388545803000, "departure": 1388545819000, "latitude": 51.00889666666667, "longitude": 13.802945, "distance": 492, "status": 1, "hasCntStop": "Y", "cntStopKey": 60468997, "sclTripLabel": "4_N404-H  04:08", "sclTripLabelShort": "11_73074\r", "sclBlockLabel": "Linie 004   Kurs 09", "sclBlockLabelShort": null, "cntSequence": 2, "departureAsString": "2014-01-01 04:10:19", "arrivalAsString": "2014-01-01 04:10:03", "rawStartDateAsString": "2014-01-01 03:52:10"},
      {"someSplitKey": 3, "rawStartDate": 1388544730000, "vehicleCode": "2581", "vehicleLabel": "Strab 232 581", "rawId": 62707, "rawStopId": 4, "arrival": 1388545899000, "departure": 1388545906000, "latitude": 51.01172833333333, "longitude": 13.808766666666665, "distance": 597, "status": 1, "hasCntStop": "Y", "cntStopKey": 60468999, "sclTripLabel": "4_N404-H  04:08", "sclTripLabelShort": "11_73074\r", "sclBlockLabel": "Linie 004   Kurs 09", "sclBlockLabelShort": null, "cntSequence": 4, "departureAsString": "2014-01-01 04:11:46", "arrivalAsString": "2014-01-01 04:11:39", "rawStartDateAsString": "2014-01-01 03:52:10"},
      {"someSplitKey": null, "rawStartDate": 1388544730000, "vehicleCode": "2581", "vehicleLabel": "Strab 232 581", "rawId": 62707, "rawStopId": 5, "arrival": 1388546073000, "departure": 1388546088000, "latitude": 51.01345666666667, "longitude": 13.821228333333332, "distance": 1144, "status": 1, "hasCntStop": "Y", "cntStopKey": 60469002, "sclTripLabel": "4_N404-H  04:08", "sclTripLabelShort": "11_73074\r", "sclBlockLabel": "Linie 004   Kurs 09", "sclBlockLabelShort": null, "cntSequence": 7, "departureAsString": "2014-01-01 04:14:48", "arrivalAsString": "2014-01-01 04:14:33", "rawStartDateAsString": "2014-01-01 03:52:10"}
    ],

    oneValidEntry: [
      {"someSplitKey": 1, "latitude": 0.0, "longitude": 0.0},
      {"someSplitKey": 2, "latitude": 51.00889666666667, "longitude": 13.802945},
      {"someSplitKey": 3, "latitude": 0.0, "longitude": 0.0 }
    ],

    threeDifferentSplitKeys: [
      {"someSplitKey": 1, "latitude": 12.34, "longitude": 12.34},
      {"someSplitKey": 1, "latitude": 12.34, "longitude": 12.34},
      {"someSplitKey": 3, "latitude": 12.34, "longitude": 12.34},
      {"someSplitKey": 4, "latitude": 12.34, "longitude": 12.34},
      {"someSplitKey": 4, "latitude": 12.34, "longitude": 12.34},
    ],


  }
);