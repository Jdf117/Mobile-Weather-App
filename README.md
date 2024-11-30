This is my simple mobile weather app that tells the 5 day forcast of the location the user enters. UI is simple and easy to understand.

This time, I decided to begin this project by planning my approach and write logs every step of the way for my own reference.

My plan:

1. Look through class notes and reference material to understand fundamentals

2. Go through expo tutorial to figure out what kind of code i can utilize in my assignment

3. Set up React-native project using EXPO and its basic UI layout

4. Use API to fetch weather data and display it in the app

5. Add functionality to search for location and display 5 day forecast

6. Validate data and display on UI in a clean and simple manner

Notes:

I used react-native-elements module to use cards for the UI (npm install @rneui/themed @rneui/base)



Issues I ran into during the assignment:

1.  Components don't work -- decided to code it straight into index.tsx and fix later

2.  Ran into NativeViewGesture Handler Error

    Issues:

             - textInput tag and including its props did not work properly

             - errors popped up that could not be dismissed because the app would not load

    Cause:

             - imported textInput from react-native-gesture-handler

    Fix:

             - imported TextInput from react-Native instead

3.  My weather and Forecast types were not recognized

    Issues:

             - Data was able to be read and displayed on UI

    Cause:

             - types were not explcitely defined

    Fix:

             - created type for Weather and forecast with appropriate attributes (ie temp, humidity and description).

             - this allowed my access the array and other string data that was return in the API response

4.  GitHub problems

    Issues:

          - could not push to repo

          - having authentication issues pushing

    Cause:

          - I ssh'd into remote repo with default origin branch name that did not match default branch on local repo. Main and master respectively.

          - caused a conflict in the branches

          - Authentication issue was just simple permissions issues on my local machine

    Fix:

          - changed the default branch on remote repo to master and deleted main branch

          - changed permissions for remote access
