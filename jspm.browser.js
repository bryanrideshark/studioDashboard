SystemJS.config({
    baseURL: "/",
    production: false,
    paths: {
        "rxjs/*": "node_modules/rxjs/*.js",
        "github:": "jspm_packages/github/",
        "npm:": "jspm_packages/npm/",
        "src/": "src/",
        "StudioDashboard/": "src/"
    }
});
