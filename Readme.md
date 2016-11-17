studioDashboard
=====================

DigitalSignage.com enterprise management studio   
----------------

<h5>by digitalsignage.com</h5> 
==========

------------------------------------------------------------------------

StudioDashboard is an open source, Digital Signage Enterprise manager for subscribers of the Enterprise 
edition of MediaSignage Inc.

Prerequisites to be able to fork and host on your own site:
-----------------
- Web server (preferably running node.js)

Prerequisites to fork and custom develop features:
-----------------
- An active DigitalSignage.com Enterprise account
- Working knowledge of the awesome Angular JavaScript framework

                                
Features:
----------

 - Based on the popular StudioPro Enterprise edition
 - Live server stats
 - Live station stats 
 - Live GEO Map for stations
 - Privileges and ACL manager
 - User manager
 - App manager
 - mediaADNET entire set of APIs & UI: http://www.digitalsignage.com/_html/digital_signage_ad_network.html

Links:
------------------------------------------------------------------------
- mediaCLOUD Dashboard login: http://dash.digitalsignage.com
- Docs for StudioDashboard API: http://www.digitalsignage.com/dashDocs/docs/
- Home: http://digitalsignage.com
- Enterprise benefits: http://www.digitalsignage.com/_html/benefits.html
- Support: http://script.digitalsignage.com/forum/index.php/board,9.0.html
- StudioDashboard video: TBA
- Angular2: https://angular.io/
- Angular2 docs: https://angular.io/docs/ts/latest/
- Angular2 GitHub: https://github.com/angular/angular/tree/master/modules/angular2
- TypeScript: https://www.typescriptlang.org/
- jspm: http://jspm.io/ 


Technical data:
------------------------------------------------------------------------
- The application uses the jspm module / npm loader
- Use latest release of Angular2
- Application is powered by TypeScript
- App can be hosted to run locally (recommended on node.js) or on any hosted web server
   Keep in mind that you must serve the source from the root (/) of the server domain (not under any sub-directory)
- License is modified GPL V3

Installation (currently using jspm beta 0.17):
------------------------------------------------------------------------
 
```
git clone https://github.com/born2net/studioDashboard.git
cd studioDashboard
npm install -g jspm@beta
npm install -g gulp
npm install
```


Customization:
------------------------------------------------------------------------
Keep in mind the StudioDashboard is often released with new updates, so you will lose any changes you make to your code if you overwrite it with our release builds.
Be sure to merge changes and subclass modules to be able to continue and receive updates without loosing your source changes.

StoreModel
------------------------------------------------------------------------

this app relies on the AppStore implementation, to learn watch:

[![The Ultimate redux typed store implementation for angular](http://img.youtube.com/vi/bEkPEnudm7s/0.jpg)](https://www.youtube.com/watch?v=bEkPEnudm7s&feature=youtu.be "The Ultimate redux typed store implementation for angular")

For the ultimate Angular 2 kitchen sink visit: 
https://github.com/born2net/ng2Boilerplate


License:
------------------------------------------------------------------------
- StudioDashboard is available under GPL V3 https://github.com/born2net/signagestudio_web-lite/blob/master/LICENSE

