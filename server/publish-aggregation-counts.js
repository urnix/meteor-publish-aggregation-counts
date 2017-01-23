AggregationCounts = {};
AggregationCounts.publish = function (sub, name, collection, pipeline, options) {
  var defaultOptions = {
    observeSelector: {}, observeOptions: {}
  };
  options = _.extend(defaultOptions, options);
  var initializing = true;

  function update () {
    if (initializing) return;
    var count = collection.aggregate(pipeline).length;
    if (sub.count !== count) {
      sub[(sub.count ? 'changed' : 'added')]('aggregationCounts', name, {count: count});
      sub.count = count;
    }
  }

  var query = collection.find(options.observeSelector, options.observeOptions);
  var handle = query.observeChanges({
    added: update, changed: update, removed: update, error: function (err) {
      throw err;
    }
  });

  initializing = false;
  update();
  if (!options.noReady)
    sub.ready();

  sub.onStop(function () {
    handle.stop();
  });
};
