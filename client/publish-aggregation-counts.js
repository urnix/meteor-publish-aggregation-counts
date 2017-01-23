AggregationCounts = new Mongo.Collection('aggregationCounts');

AggregationCounts.get = function (name) {
  var count = this.findOne(name);
  return count && count.count || 0;
};

if (Package.templating) {
  Package.templating.Template.registerHelper('getAggregationCount', function(name) {
    return AggregationCounts.get(name);
  });
}
