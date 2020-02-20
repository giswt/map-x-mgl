/**
 * Class to handle MapX specific method
 */
let h;
class MapxResolvers {
  contructor(opt) {
    const mr = this;
    mr.opt = Object.assign({}, opt);
    if (!mr.opt.helpers) {
      throw new Error('mx.helpers not found');
    }
    console.log(mr);
    h = mr.opt.helpers;
  }
  /**
   * List resolvers methods
   * @return {Array} array of supported methods
   */
  list_method() {
    return Object.keys(this);
  }
  /**
   * Set panel visibility
   * @param {Object} opt Options
   * @param {String} opt.panel Name of the panel (views, tools)
   * @param {Boolean} opt.show If true, show the panel (and hide other)
   * @param {Boolean} opt.toogle Toggle the panel
   */
  set_panel_left_visibility(opt) {
    opt = Object.assign({}, {panel: 'views', show: true}, opt);
    h.panelLeftSwitch(opt);
  }

  /**
   * Get list of available views as static objects
   * @return  {Array} Array of views
   */
  get_views() {
    return h.getViewsForJSON();
  }

  /**
   * Get list of available views id
   * @return  {Array} Array of id
   */
  get_views_id() {
    return h.getViewsForJSON().map((v) => v.id);
  }
  /**
   * Get vector view (vt) metadata of the attribute
   * @param {Object} opt Options
   * @param {String} opt.idView Id of the view
   * @return {Object} attribut metadata
   */
  get_view_meta_vt_attribute(opt) {
    opt = Object.assign({}, {idView: null}, opt);
    const view = h.getView(idView);
    if (h.isView(view)) {
      return h.path(view, 'data.attribute', {});
    }
  }

  /**
   * Get view metadata
   * @param {Object} opt options
   * @param {String} opt.idView Id of the view
   * @param {Object} view meta data object
   */
  get_view_meta(opt) {
    opt = Object.assign({}, {idView: null}, opt);
    return h.getViewMetadata(opt.idView, true);
  }

  /**
   * Get user id
   * @return {Number} Current user id
   */
  get_user_id() {
    return mx.settings.user.id;
  }

  /**
   * Get user ip info
   * @return {Object} Current user ip object (ip, country, region, etc)
   */
  get_user_ip() {
    return fetch('https://api.mapx.org/get/ip').then((r) => r.json());
  }

  /**
   * Get user roles
   * @return {Object} Current user roles
   */
  get_user_roles() {
    return mx.settings.user.roles;
  }
  /**
   * Get user email
   * @return {String} Current user email
   */
  get_user_email() {
    return mx.settings.user.guest ? '' : mx.settings.user.email;
  }
  /*
   * Set project
   * @param {Object} opt project option
   * @param {String} opt.idProject Id of the project to load
   */
  set_project(opt) {
    opt = Object.assign({}, {idProject: null}, opt);
    return h.setProject(opt.idProject);
  }

  /**
   * Get current language
   * @return {String} Two letters language code
   */
  get_language() {
    return mx.settings.language;
  }

  /**
   * Get list of supported current languages
   * @return {Array} Array of two letters language code
   */
  get_languages() {
    return mx.settings.languages;
  }

  /**
   * Get projects list
   * @param {Object} opt Project fetching option
   * @return {Array} list of project for the current user, using optional filters
   */
  get_projects(opt) {
    return h.fetchProjects(opt);
  }
  /**
   * Get current project id
   * @return {String} Current project id
   */
  get_project() {
    return mx.settings.project;
  }

  /**
   * Get list of collection for the current project
   * @return {Array} Array of collections names
   */
  get_project_collections() {
    return h.getProjectViewsCollections();
  }

  /**
   * Test if the current user is guest
   * @return {Boolean} User is guest
   */
  is_guest() {
    return mx.settings.user.guest === true;
  }

  /**
   * Filter view layer by text (if attribute is text)
   * @param {Options} opt Options
   * @return null
   */
  set_view_layer_filter_text(opt) {}

  /**
   * Filter view layer by numeric (if attribute is numeric)
   * @param {Options} opt Options
   * @param {String} opt.idView Target view id
   * @param {Numeric} opt.value Value
   * @return null
   */
  set_view_layer_filter_numeric(opt) {
    return _apply_layer_slider('numericSlider', 'set', opt);
  }

  /**
   * Filter view layer by time ( if posix mx_t0 and/or mx_t1 attributes exist )
   * @param {Options} opt Options
   * @param {String} opt.idView Target view id
   * @param {Numeric | Array} opt.value Value or range of value
   * @return null
   */
  set_view_layer_filter_time(opt) {
    return _apply_layer_slider('timeSlider', 'set', opt);
  }
  /**
   * Set layer transarency (0 : visible, 100 : 100% transparent)
   * @param {Options} opt Options
   * @param {String} opt.idView Target view id
   * @param {Numeric} opt.value Value
   * @return null
   */
  set_view_layer_transparency(opt) {
    return _apply_layer_slider('transparencySlider', 'set', opt);
  }
  /*  get_view_layer_filter_numeric: () => {*/
  //return _apply_layer_slider('numericSlider', 'get');
  //},
  //get_view_layer_filter_time: () => {
  //return _apply_layer_slider('timeSlider', 'get');
  //},
  //get_view_layer_transparency: () => {
  //return _apply_layer_slider('transparencySlider', 'get');
  //},
  //open_view: (opt) => {
  //opt = Object.assign({}, {idView: null}, opt);
  //const view = h.getView(opt.idView);
  //const valid = h.isView(view);
  //if (valid) {
  //h.viewOpenAuto(view);
  //}
  //},
  //close_view: (opt) => {
  //opt = Object.assign({}, {idView: null}, opt);
  //const view = h.getView(opt.idView);
  //const valid = h.isView(view);
  //if (valid) {
  //h.viewCloseAuto(view);
  //}
  //},
  //show_modal_login: () => {
  //if (mx.settings.mode.app) {
  //Shiny.onInputChange('btn_control', {
  //time: new Date(),
  //value: 'showLogin'
  //});
  //}
  //},
  //show_modal_meta: (opt) => {
  //opt = Object.assign({}, {idView: null}, opt);
  //const view = h.getView(opt.idView);
  //const valid = h.isView(view);
  //if (valid) {
  //h.viewToMetaModal(view);
  //}
  //},
}

export {MapxResolvers};

/**
 * Helpers
 */
function _apply_layer_slider(type, method, opt) {
  opt = Object.assign({}, {idView: null, value: null}, opt);
  const view = h.getView(opt.idView);
  const valid =
    h.isView(view) &&
    h.isObject(view._interactive) &&
    h.isObject(view._interactive[type]) &&
    h.isFunction(view._interactive[type][method]);

  if (valid) {
    return view._interactive[type][method](opt.value);
  }
}
