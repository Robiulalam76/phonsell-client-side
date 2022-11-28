import React from 'react';

const Blogs = () => {
    return (
        <div>
            <section className="dark:bg-gray-800 dark:text-gray-100">
                <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                    <h2 className="text-2xl font-semibold sm:text-4xl">Frequently Asked Questions and Answere</h2>
                    <p className="mt-4 mb-8 dark:text-gray-400"></p>
                    <div className="space-y-4">
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">1. What are the different ways to manage a state in a React application?
                            </summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
                                In React apps, there are at least seven ways to handle the state. Let us briefly explore a few of them in this part.

                                URL
                                We can use URL to store some data e.g.

                                The id of the current item, being viewed
                                Filter parameters
                                Pagination offset and limit
                                Sorting data
                                Keeping such data in the URL allows users to share deep links with others.

                                It is recommended to avoid storing such information in the app’s state to avoid the URL in our app getting out of sync. The URL should be used as the system of record, Read from it as needed for information related to sorting, pagination, etc. Update the URL as required when the settings change

                                React Router is a great tool to handle routes and manage the params.

                                Web Storage
                                The second option is to store the state in the browser via web storage. This is useful when we want to persist state between reloads and reboots. Examples include cookies, local storage, and IndexedDB. These are native browser technologies.

                                Data persisted in the browser is tied to a single browser. So, if the user loads the site in a different browser, the data will not be available.

                                We avoid storing sensitive data in the browser since the user may access the app on a shared machine. Some examples of where web storage might be most useful include storing a user’s shopping cart, saving partially completed form data or storing JWT token in HttpOnly Cookie.

                                Here is an example of saving user preferences locally in the browser or even persist the complete state for one or more of our components.

                                Lifted State
                                The Fourth option is to define the state in the parent component. Often, the same state is used across multiple components. In those cases, it is useful to lift the state to a common parent. The lifting state is a two‑step process. First, we declare the state in a common parent component, and then we pass the state down to child components via props. This pattern should be considered any time a few related components need to use the same state. The lifting state avoids duplicating states in multiple components. It helps to assure that our components all consistently reflect the same state.

                                Derived State
                                The fifth option is to compute the new state based on the available state and we do not need to declare a state at all. If there are existing values that can be composed to give us the information we need, then we can calculate that information on each render instead of storing it. Some examples include calling .length on an array to determine the number of records instead of storing a separate numItems variable in the state or deriving an errorsExist boolean by checking if the errors array is empty.

                                So, why bother deriving the state? Well, deriving the state avoids our state values getting out of sync. It simplifies our code since we do not have to remember to keep separate values in sync. When we update the state, derived values are automatically recalculated in the render.
                            </p>
                        </details>
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">2. How does prototypical inheritance work?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">In a class-based model, you have Classes, which are represented by the triple “Parents, Variables, Methods. Where:

                                Parents is the list of classes you’re extending. Classes may only extend other classes;
                                Variables is the number of variable slots that instances will have. For example, a “class Point2d(int x, int y)  has 2 instance variables;
                                Methods is a table of “name → function” that describes which services each instance of the class will support;
                                Instances (or Objects) in a class-based model are represented with the tuple “Class, Values Where:

                                Class is a pointer to the class triple that defines how many variables this instance supports, and what methods you can call on it;
                                Values is a list of the values for each variable the instance has.
                                In this model, Classes only describe how instances look like, and Instances are the only thing you can interact with. Classes cannot be instances, and you can’t inherit from Instances.

                                Turns out that if we change things slightly, we can combine Classes and Instances into a single concept: an Object. So instead of the model above, we can have a single triple Parents, Variables, Methods. Which happens to look exactly like our Classes triple in the names alone, but there are some semantic differences:

                                Parents is a list of Objects that we inherit from. Objects here are the same triple, so this doesn’t change much our concept of inheritance established above in the class-model. Objects are just a “more powerful” class of sorts;
                                Variables is a mapping “name → value”. This is because we now have to store the values as well. You could have a simple list, but inheritance then becomes a problem—how do you conciliate methods expecting “variable 0” meaning different things for different objects? Names at least reduce this problem;
                                Methods is a mapping “name → function”. Same as in the class-model.
                                We can even simplify this further and merge “Variables” and “Methods”, as they’re both mappings from some kind of name to some kind of value. We’d just need to make “function” a value—which is exactly what JavaScript does.

                                So, JavaScript’s model is something like: “Parent, Slots. Where “Parent” is a single object (or null), because JavaScript does not support multiple inheritance; and “Slots” is a mapping “name → value” that combines Variables and Methods. Functions are just a regular value, after all.

                                (Python uses this model too, because it’s the right thing to do. You really don’t want to have to deal with all of the headaches that come from separating classes from objects and making classes objects at the same time)

                                It’s important to note that this answer is about models (i.e.: what goes under the hood in the language specification and non-optimised implementations). What actually happens when you run a program is very different, because compilers will try their best to make the processor do no work, if they can. They’ll remove all objects and functions and operations you write if there’s no real need for them to exist. The only way of knowing that is reading the entire source code of a specific compiler on every new commit.

                                And what people interact with (along with the conceptual models they use for programming) is not necessarily based on this either. JavaScript has a “class” concept, and it has had that since its first version. People use classes in JavaScript, and they may not even think about what’s going under the hood at all, and that’s perfectly fine.</p>
                        </details>
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">3. What is a unit test? Why should we write unit tests?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. This testing methodology is done during the development process by the software developers and sometimes QA staff.  The main objective of unit testing is to isolate written code to test and determine if it works as intended.

                                Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.

                                Unit testing is a component of test-driven development (TDD), a pragmatic methodology that takes a meticulous approach to building a product by means of continual testing and revision. This testing method is also the first level of software testing, which is performed before other testing methods such as integration testing. Unit tests are typically isolated to ensure a unit does not rely on any external code or functions. Testing can be done manually but is often automated.

                                To justify any effort in business, there must be a positive impact on the bottom line. Here are a few benefits to writing unit tests:

                                Unit tests save time and money. Usually, we tend to test the happy path more than the unhappy path. If you release such an app without thorough testing, you would have to keep fixing issues raised by your potential users. The time to fix these issues could’ve been used to build new features or optimize the existing system. Bear in mind that fixing bugs without running tests could also introduce new bugs into the system.
                                Well-written unit tests act as documentation for your code. Any developer can quickly look at your tests and know the purpose of your functions.
                                It simplifies the debugging process.
                                Unit testing is an integral part of extreme programming. Extreme programming is basically a “test-everything-that-can-possibly-break” programming strategy.
                                Unit tests make code reuse easier. If you want to reuse existing code in a new project, you can simply migrate both the code and tests to your new project, then run your tests to make sure you have the desired results.
                                Unit testing improves code coverage. A debatable topic is to have 100% code coverage across your application.
                                In the testing pyramid, unit tests are faster than integration and end-to-end. They are more assertive and return quick feedback.</p>
                        </details>
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">4. React vs. Angular vs. Vue?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
                                It is just a JavaScript library, not a framework.
                                No possibility to implement MVC architecture.
                                Frequently insufficient for developing a web app and necessitating the use of other libraries.
                                Only worth using if web applications need to be highly interactive.

                                What is Vue?
                                Vue.js is a JavaScript-based progressive framework for creating single-page applications. It was created with scalability and incrementality in mind, as well as ease of integration with other view layer frameworks.

                                Vue is built from the bottom up to be progressively adaptable, unlike other monolithic frameworks. The core library focuses solely on the view layer, and it’s simple to use and connect with other libraries or applications. This framework’s fast learning angle is almost a trademark. It’s a flexible framework that may be used as a library or a full-fledged framework for developing large web applications.

                                Vue.js combines the useful principles of the Angular and React frameworks and presents them in a minimalistic modern style. Web developers use Vue.js to create frontend user interfaces for web-based and hybrid mobile applications.

                                Pros and Cons of Vue.js
                                Pros:

                                A list of tools and libraries (Vue.js official CLI, Development Tools, Vue Loader, Vue Router).
                                Flexibility and simplicity in the utilization.
                                Thorough documentation.
                                Reusable in the terms of adding numerous reactive components to the existing code.
                                The possibility of Component-Based Architecture (CBA)
                                Cons:

                                Limited community comparing to Angular and React
                                The number of available plugins
                                Language handicap because a large number of users are non-English speakers
                                Overcomplications with flexibility</p>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blogs;