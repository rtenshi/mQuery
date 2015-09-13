# mQuery

mQuery is a jQuery Library (requires jQuery), which fires javascript functions based on the change of the CSS media queries, so that javascripts can be target per Viewport and reduce the necessity to create window.resize functions.
To achieve it, it is necessarty to configure the CSS media queries, giving the HTML element a custom font-family, for example:
```
@media screen and (min-width: 768px){
  html {
    font-family: 'xs' 
  }
}
```
(the 'xs' is to symbolize the xs size from bootstrap, but any text can be used as anchor for the javascript)
The real font-family should be bounded at the body bounded.


#Now we go to the Javascript...

mQuery can be called when the document is ready, by the following command:

```mQuery('media query')```

following our 'xs' example, would be: 

``` mQuery('xs') ```

but how can we bind the functions and how can we control what makes what?
mQuery have the following functions:

#mQuery Functions

<p><strong>.enter(callback) :</strong> callback is called when the media query is entered.</p>
<p><strong>.update(callback) :</strong> callback is called once after the media query is entered, and when the window is resized, a setTimeout is already pre-configured (200ms).</p>
<p><strong>.leave(callback) :</strong> called when the media query is left, and before the 'enter' function is called.</p>

The calls can be chainned to make easer the control:

```
mQuery('xs').enter(function1).enter(function2).leave(function3).update(function4).enter(function5);
```

the order is irrelevant.

If you still have questions, sugestions or improvement, fell free to contact me here.

#Thanks at DaPedro (info@dapedro.de) for the idea and the first version of the J77 Responsive
