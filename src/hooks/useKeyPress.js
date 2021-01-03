import { useState, useEffect } from 'react';

//1 Pass in a callback as a parameter. You’ll do most of your logic inside this callback.
const useKeyPress = callback => {

    //2 Call the useState hook to create a state for the pressed key. Every time a key is 
    //  pressed, you’ll call setKeyPressed to update the current key.
    const [keyPressed, setKeyPressed] = useState();

    //3 Do your key update operations inside useEffect. You can consider useEffect similar 
    //  to componentDidMount or componentDidUpdate.
    useEffect(() => {

        //4 nside downHandler, which is the handler when a key is down, you only update the 
        //  key pressed based on two conditions. First, check whether it is a different key 
        //  to prevent registering the same key stoke when the user holds the key for too long. 
        //  Second, check whether it is a single character key, i.e. not CTRL, Shift, Esc, Delete, 
        //  Return, Arrow, etc.
        const downHandler = ({ key }) => {
            if (keyPressed !== key && key.length === 1) {
                setKeyPressed(key);
                callback && callback(key);
            }
        };
        //5 Inside upHandler, which is the handler when a key is up (released), set the current key 
        //  state to null. This is to make it work nicely with step 4.
        const upHandler = () => {
            setKeyPressed(null);
        };

        //6 Register the handlers with the browser’s window.
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            //7 At the end of useEffect, return a function that does the cleanup. In this case, 
            // deregister the handlers with the browser’s window.
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    });
    //8 Return the keyPressed state to the caller. In this tutorial, you don’t have to use this return value.
    return keyPressed;
};

export default useKeyPress;