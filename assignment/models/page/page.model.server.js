module.exports = function () {

    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel
    };
    return api;

    function createPage(websiteId, page) {
        return PageModel
            .create(page)
            .then(function(pageObj){
                model.websiteModel
                    .findWebsiteById(wid)
                    .then(function(websiteObj){
                        websiteObj.pages.push(pageObj);
                        pageObj._website = websiteObj._id;
                        pageObj.save();
                        return websiteObj.save();
                    }, function(error){
                        console.log(error);
                    });
            });
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({"_website": wid});
    }

    function findPageById(pageId) {
        return PageModel.findById(pid);
    }

    function updatePage(pageId, page) {
        return PageModel
            .update(
                {
                    _id: pid
                },
                {
                    name: page.name,
                    title: page.title
                }
            );
    }

    function deletePage(pageId) {
        return PageModel
            .remove({_id: pid});
    }

    function setModel(_model) {
        model = _model;
    }
};