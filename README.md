# AnimateCSS Helper
## A JQuery plugin for dynamically applying CSS animations to DOM elements

This plugin was created to be used with with Daniel Eden's excellent CSS library "Animate.css", but it also supports custom animations, provided they were defined in the same way as "Animate.css" defines its own animations.

### What does it do?

It handles the correct application of a CSS animation to a DOM element, including customizable settings for animation duration, delay and amount of loops. 
While doing so it also takes care of inline-styles pre-existing on the element that's supposed to be animated and restores those when the animation is completed. 
Last, but not least, it also provides the option to define a callback function and custom parameters for it that will be executed when the animation has ended. 

## Usage:

Simply chain the function call to a jQuery selection set:
```javascript
  $(window).load(function(){
    $('.zoom-in-on-page-load.initially-hidden').removeClass('initially-hidden').applyAnimation({ 
      type: 'zoomIn', 
      duration: 0.64, 
      delay: 0.2, 
      loops: 3, 
      callback: function(a, b){ console.log('Animation: "' + a + '" executed ' + b + ' times.'); }, 
      callback_params: ['zoomIn', 3] 
    });
  });
```

## Options:

* __type__  
  __Expects:__ String  
  __Default Value:__ "pulse"  
  __Description:__  
  Defines the type of animation to be played by providing the name of the animation's CSS class / keyframe animation name (which are synonymous in Animate.css).
  
* __duration__  
  __Expects:__ Number / String / Void  
  __Default Value:__ null  
  __Description:__  
  Determines how long it will take the animation to run. Not specifying anything will fall back to the default animation duration defined by Animate.css. Numeric values will always be interpreted as seconds, so it is strongly recommended to enter floating point numbers for precise control. Alternatively, it is also possible to provide a string like "240ms".
  
* __delay__  
  __Expects:__ Number / String / Void  
  __Default Value:__ null  
  __Description:__  
  Determines how long the browser will wait after the function has been called before it actally starts the animation. Not specifying anything will cause the animation to run immediately. Numeric values will always be interpreted as seconds, so it is strongly recommended to enter floating point numbers for precise control. Alternatively, it is also possible to provide a string like "240ms".  
  
* __loops__  
  __Expects:__ Integer / Void  
  __Default Value:__ null  
  __Description:__  
  Defines how many times the animation will start again from the beginning after it finished. After the specified amout it will end for good. Not specifying anything here will cause the animation to run only once.
  
* __callback__   
  __Expects:__ Function / Void  
  __Default Value:__ null  
  __Description:__  
  A callback function can be passed to the plugin that will be called when the animation has finished.
  
* __callback_params__  
  __Expects:__ Array / Void  
  __Default Value:__ null  
  __Description:__  
  If the provided callback function requires certain parameters, they must be provided via this property. This parameter only accepts an array, you can not provide callback parameters in any other form.