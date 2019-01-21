/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            //make sure that the allFeeds variable has been defined
            expect(allFeeds).toBeDefined();
            //and that it is not empty
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            //loop through each feed
            allFeeds.forEach(function(feed) {
                //url is defined
                expect(feed.url).toBeDefined();
                //url is not empty
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function() {
            //loop through each feed
            allFeeds.forEach(function(feed) {
                //name is defined
                expect(feed.name).toBeDefined();
                //name is not empty
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        //DOM-elements needed for testing
        let body = document.querySelector('body');
        let menuIcon = document.querySelector('.menu-icon-link');
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            //body element has class named 'menu-hidden'
            //see style.css: tranlsate3d
            expect(body.className).toBe('menu-hidden');
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('toggles visibility when icon is clicked', function() {
            //make a click on menu-icon
            menuIcon.click();
            //menu is visible
            expect(body.className).toBe('');
            //make another click on menu-icon
            menuIcon.click();
            //menu is invisible
            expect(body.className).toBe('menu-hidden');
        });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        //wait for allFeeds[0] to be loaded
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        
        it('are loaded', function(done) {
            //first child is there and has an appropriate class
            let entryClass = document.querySelector('.feed').firstElementChild.className;
            expect(entryClass).toBe('entry-link');
            done();
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        //variables needed to compare different contents 
        let entry0, entry1;
        //wait for allFeeds[0] to be loaded
        beforeEach(function(done) {
            loadFeed(0, function() {
                //first entry in that feed
                entry0 = document.querySelector('.feed').firstElementChild.innerHTML;
                done();
            });
        });

        //wait for allFeeds[1] to be loaded (thx to loadFeed callback param)
        it('changes content', function(done) {
            loadFeed(1, function() {
                //first entry in that feed
                entry1 = document.querySelector('.feed').firstElementChild.innerHTML;
            });
            //the two entries cannot be the same
            expect(entry0).not.toEqual(entry1);
            done();
        });
    });
}());
