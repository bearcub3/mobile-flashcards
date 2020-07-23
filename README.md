# mobile-flashcards

## Flow : React Static Type Checker

As we build an application, without type checking, there would be a possibility that we would end up producing many error-prone artefacts as the application gets bigger and more people to work at the same time. It means that you tell Flow how you want the codes to work explicitly and then whenever the code block runs somewhere in the application, the collaboration would be more efficient as we minimise the risk of the other developers misuse it and another benefit is that reducing the time for debugging as we don't have to figure out whether what type of data passes as props, parameters causes the error or something else.

I found it is very useful using Flow CLI for single file type checking since I have already completed a few components without writing any type checking.

    yarn run flow check-contents < **/**.js

This way we can individually check each content from stdin for flow type checker as the directory gets bigger you may not want to run whole directory for type check.

#### cannot resolve module error with Flow

Any third party library may not have sufficient type information or is more likely they are not written with Flow and then when you import the module, Flow returns an error saying that 'Cannot resolve module **\*'. You can handle this situation with the 'library definition'. Oh God, I hate the error warning on the terminal and it took a while to find this out as a noob. Anyway, this is a general best practices to provide 'library definition' for each third-party library. We can either create it as we find error messages manually or use `flow-typed` which makes devs life so much easier. It provides a collection of high-quality library definitions based on the third party libraries we installed in our project, but, if it doesn't find the right ones, it seems to generate new library definition files automatically! No more 'cannot resolve moule **' errors on the terminal. Lastly, add `flow-typed` folder which is generated by the `flow-typed` library to `[libs]` in the `.flowconfig`.

#### how to use absolute path with Flow

    import { _getDecksData, _getUsersData, _saveUserAnswer } from './data';

Apparently Flow requires its own module configuration for this. Of course, if you can just use relative path, that may be a easier solution. However, I am pretty sure most of devs wouldn't prefer multiple slashes until it reaches to the directory. As I have always been using `./` to import the files in a same directory. I wanted to keep this rule.

1.  go to `[options]` in `.flowconfig`

2.  add the option below

        module.name_mapper='^.\(.*\)$' -> '<PROJECT_ROOT>/utils/\1'

This is not a regular regex I've seen/written before.
Based on the Flow documentation, it is `OCaml regular expressions`. 😣
I will need to add the similar module name option per directory. As I am a less experienced React Native dev, this is something I am curious about how other experienced devs would handle this.

> If you are VSCode user, hover the cursor over the imported module file name. You can see the full file directory for the module so you can check whether the directory is right or not.

#### styled-component with React Native

All the dimensions in React Native are unitless. So, we do not need to explicitly write the unit for any dimensions such as, width, height, font-size, etc. However, I realized that styled-component unit system doesn't really align with React Native regarding this matter. It seems to be quite controversial to some developers. But, without px unit, eslint keeps throwing loads of error messages. As a person who used so many different types of units for different use cases on the web, this really baffles me. Perhaps styled-component is not a great choice for mobile development after all? Even though `px` unit in css is density independent unit, then why does it work differently on the browsers? what about all the `rem`, `vw`, `%` and so on...? I may use `StyleSheet` API next time. Surprisingly, even with `px` units, everything looks identical on mobile.
