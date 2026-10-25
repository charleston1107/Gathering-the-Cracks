# Media audit — 2026-10-25

Checked the public R2 URLs referenced by the photo pages, map page, and destinations declared in src/map3dscene.js. HTML comments were excluded. HTTP HEAD checks verify existence and content delivery, not video decoding or visual composition.

- 99 unique URLs checked after repairs: 98 returned 200; 1 returned 404.
- All image URLs on the nine active map destinations returned 200: demolition, restaurant, icecreamshop, market, river, ricebarn, puppy, fangfake, tinhouse.
- photos.html still references missing assets/img/basketballcourt.jpg. Its sphere is not added to the scene; this is not an active map destination. No verified replacement was found locally or at the uppercase .JPG variant.
- Corrected case: icecream/i3.JPG, icecream/i4.JPG, photo_assets/3.jpg, photo_assets/10-2.jpg.
- Screenshot inventory contains one unreferenced photo: 11-2.jpg. Assigned it to photo14. Photo16 (17-2.JPG), photo18 (12-4.jpg), and photo19 (4-3.JPG) reuse existing photos.
- Missing photo9 and photo15 videos were replaced by static backgrounds (21.JPG and 15-1.JPG). Existing text retained, with separate columns.
- photo13 remains empty; it is not linked from the current homepage.
- Archive images now use build-resolved relative paths. Photobook PDF is imported with ?url so Vite emits it into dist.
- Production build succeeds. Existing warnings include missing legacy scripts on photos.html and an unresolved src/assets_new/index_bg.png reference.
- No deployment performed.
