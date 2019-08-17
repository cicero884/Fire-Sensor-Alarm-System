import * as React from "react";
import * as H from "history";

export const useIsFireFighter = (location: H.Location) => {
    const [isFireFighter, set] = React.useState();
    React.useEffect(() => {
        set(location.pathname.indexOf("/firefighter") !== -1);
        return () => {};
    });
    return isFireFighter;
};
