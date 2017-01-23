Package.describe({
  name: "artemi:publish-aggregation-counts",
  summary: "Publish the count of a aggregation, in real time",
  version: "0.0.1",
  git: "https://github.com/urnix/meteor-publish-aggregation-counts.git",
  documentation: "README.md"
});

Package.on_use(function (api, where) {
  api.versionsFrom("METEOR@0.9.2");
  api.use(['blaze', 'templating'], 'client', { weak: true });
  api.use('mongo', 'client');
  api.use('underscore', 'server');
  api.add_files('client/publish-aggregation-counts.js', 'client');
  api.add_files('server/publish-aggregation-counts.js', 'server');
  api.export('AggregationCounts');
});
