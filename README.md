# **handlers**
---
A simple to learn and use API for custom event handlers in HTML5; supporting both Typescript and ES6.
> See **'installation'** for obtaining the API.

> See **'usage'** for learning how to use the API.  

## **installation**
---
Simply install the repository using npm.
```shell
#Assuming you are in your project's directory
npm i @dyrektrypt/handlers
```
And that's it! Now all you need to do is import desired custom handlers.

Please note if using Typescript, the tsconfig property `moduleResolution: node` should be present in order to support npm imports.

## **usage**
---
Custom handlers work by being built upon default HTML5 events; allowing for more complex detection oriented around elements.

Event handlers come with at least two functions:
* create[Event]Handler - creates, binds and returns a handler constructed from passed parameters.
* remove[Event]Handler - unbinds the previously constructed a handler from the custom event.

The current custom handlers are as follows:
* ScaleEvent:
  * createScaleHandler - creates a handler binded to the ScaleEvent, in which is called and calculated on load and every resize to scale an element (like an SVG viewBox).
  * removeScaleHandler - unbinds the handler from the ScaleEvent.
* ViewportEvent:
  * createViewportHandler - creates a handler binded to the ViewportEvent, in which is called every time an element appears or disappears of the screen.
  * removeViewportHandler - unbinds the handler from the ViewportEvent.

New custom handlers are always welcome!

To use handlers, create an instance of a desired handler by calling the correct function, which can be either:
* `createScaleHandler(element, scaleType, elementConfig, fontConfig?): () => void`
    * `element: HTMLElement` - desired element to bind the event to.
    * `scaleType: 'width' | 'height'` - type of scaling, being either changing the 'width' or 'height' property.
    * `elementConfig: ScaleEventConfig` - controlled size of an elements height or width, in order to preserve size when scaling.
    * `fontConfig?: ScaleEventConfig` - optionally controlled size of an elements font, in order to preserve size when scaling.
* `createViewportHandler(element, callback, haltStart?): () => void`
    * `element: HTMLElement` - desired element to bind the event to.
    * `load: () => void` - function to be called when the element appears in the pages viewport.
    * `unload: () => void` - optional function to be called when the element appears off of the pages viewport.
    * `haltStart?: boolean` - optional halting of firing the load function when the page loads and the element is on screen.

Noting interfaces being objects with properties:
*  `ScaleEventConfig`
    * `scalePercentage: number` - percentage for the desired property, calculated by: (pixels) / (page scale opposite) * 100.
    * `scaleMin?: number` - optional minimum pixels the desired property can scale to.
    * `scaleMax?: number` - optional maximum pixels the desired property can scale to.

An example of this:
### HTML5
```HTML
<div id="main-textbox">
```

### ES6
```ES6
import { createScaleHandler, removeScaleHandler } from '@dyrektrypt/handlers'

//Fetch 'main-textbox' element
let element = document.getElementById('main-textbox')

//Make the 'main-textbox' element scale
let scaleHandler = createScaleHandler(element, 'height',
{
    scalePercentage: 2.9304, //The element has scaling height of 40px for a page width of 1365px, calculated by: 40 / 1536 * 100
    scaleMin: 20, //The element will not scale below 20px
    scaleMax: 50 //The element will not scale above 50px
},
{
  scalePercentage: 2.0304, //The elements font has a scaling height of 40px, calculated the same way as the elements height
  scaleMin: 20, //The elements font will not scale below 20px
  scaleMax: 50 //The elements font will not scale above 50px
})
```
This will cause the `main-textbox` element to start scaling with a height of 40% for the changing width.

When scaling is no longer wanted, simply remove the handler with the removeScaleHandler function call:
`removeScaleHandler(scaleHandler)`

---