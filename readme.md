## MapX : change log

- 1.5.24
    - Improvement
      - APP : Testing session reconnection
      - APP : Instant estimate of overlap area
    - Bug fixing
      - APP : Overlap function in PixOp had issue with lines: the first coordinate of each line could have been omited.
- 1.5.23
    - Improvement
      - APP : save and update query parameters: project, language, lat, lng, zoom. 
    - Bug fixing
     - APP : Overlaps using pixop, numbers of layers to take in account did not unterstood "All layers". Should be ok
- 1.5.22
    - Improvement
      - APP/API Let the user provide a projection system for download
      - APP : add basic option for highlight overlap tools
      - APP/API : new environment variable to store tokens and allowed user id as creator
      - APP : Add public view from public project in story maps available views
- 1.5.21
   - Improvement
      - API : Set pre-simplification only for zoom > 10 in postgres. 
      - APP : Added new environment variables for handling mapbox token and allowed project creators
- 1.5.20
   - Improvement
      - Added an experimental tool to highlight potential overlaps between vector layers
    - Bug fixing
      - Story map bullets werent removed due to a DOM issue 
      - Confidentiality issue : a publisher with edit access to a story map editor was able to list and use views from a private projects to which she had no access. This could still occurs if the view is purposely shared or imported as public view to another non-private project.
- 1.5.19
   - Improvement
      - Added support for quering wms based raster source layer
- 1.5.18
   - Improvement 
      - Added support for download sources as CSV #212
      - Added projection data when downloading geospatial files #322
   - Bug fixing
      - Solved issue when images in legend where broken into multiple columns #324
   - Rollback
      - Remove privilege to create new project for everyone. Only selected user can create new project.
- 1.5.17
   - Improvement
       - Add current view count in filters by category
       - Style minor change in filter by labels and filter by attributes 
- 1.5.16
   - Improvement 
       - Modal Added four preset button for modal panel, added an option to resize panel horizontally.
       - Added autoprefixer for CSS in webpack config
   - Bug fixing
       - Dashboard modules could be ignored after a view edition. In case of only one module, the script automatically converted the value in a JSON string, and the dashboard was expecting an array. The `module` key in the `view.data.dashboard` can now be a string or an array. Or empty.
- 1.5.15
   - Added translation support in filter views list by tags
   - Filter views by tags : use `AND` operator between filter types and `OR` within filter types. 
- 1.5.14 
   - Removed bug where (empty) private project could be seen when pressing a shared view's "home" button
   - Added support for spanish. Thanks @GianlucaGygax !
   - Updated service workers strategy. Using no-cache in traefik should solve issue where old cache were kept.
   - Modification on entry files for webpack to enable a viewer only mode for the app.
- 1.5.13 
   - Removed a bug where a dashboard was not removed if no source layer where used
   - Use pointer events instead of mouse event
   - Added a 'minimize' button in modal windows
   - Removed resize corner in modal windows – ( it's not widely used and it produced a bug with flexbox )
- 1.5.12
   - Solved an issue in view button when a zoom was applied in the browser: the nested circle was not well aligned producing a weird effect. Using SVG, the problem as been solved. 
   - Update dependencies, see `app/package.json`
   - Changed the service worker generator to `workbox-webpack-plugin` 
   - Solved #277 where removal of a project did not remove releated views that does not had sources (raster, story, etc). 
- 1.5.11
   - Solved #276
   - Solved #274
   - Added a function to unregister service worker 
- 1.5.10
   - New radial progress svg constructor
   - Direct local storage for views object, in addition to browser cache and service worker cache. Faster. 
   - Bug fixes : label too long in map data properties query popup. Display the full thing on hover.
   - Code cleaning
- 1.5.9
   - Improvement of road style : added more than 30 layers extracted and modified from style "Lè Shine" (https://frama.link/leshine),
   - Integrated simplified colors setting for roads, road border and building in style editor.
- 1.5.8
   - Solved #272 : the built date was wrong in the encrypted mail validation.
- 1.5.7
   - Add service worker to cache assets and tiles,
   - Migrate language dict file to JSON, instead of csv, to be able to merge pull requests more easily,
   - Minor changes.
- 1.5.6 
   - Updated version of R,
   - Added api upload for geojson stored client side,
   - Minor changes.
- 1.5.5
   - Added query parameter support to filter max role for view fetching : `?filterViewsByRoleMax=public` will show all public views only,
   - Added styling option for map labels :  outline color.
- 1.5.4
  - Faster and more accurate view count without analyzing sequentially every project. It should counts shared views, external views, private views, public views and targeted views for every project of the current user.
- 1.5.3
  - Added a new sharing option : any view can be imported as external, non-modifiable view in a project where the user is at least a publisher,
  - Removed www/ files from git repo : those are built with webpack, not useful to have them around.
- 1.5.2
  - Fixed story map view selection #255,
  - Fixed raster legend size : let the user click to expand the image into a modal,
  - Fixed legend label alignment,
  - Fixed long abstract #253.
- 1.5.1 
  - Solved bug where user was not able to authenticate when uploading an image,
  - Better legend and description of view content, using multi-column layout.
- 1.5.0 
  - Refactoring,
  - Manage by project. It's now possible to manage your data by project, in addition to collections and classes, 
  - Using docker for the whole stack,
  - Merged app and api under the same repository.
