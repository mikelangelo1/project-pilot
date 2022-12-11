import * as React from 'react'
import { useRouter } from "next/router";

import { wrapper } from '../redux/store';

import { useSelector } from 'react-redux'

import classes from './routeguard.module.css'

const RouteGuard = (props) => {
    const router = useRouter();
    const [authorized, setAuthorized] = React.useState(false);

    const { children } = props

    const userReducer = useSelector(state => state.user);
    const persistState = useSelector(state => state['_persist'])

    React.useEffect(() => {
        // on initial load - run auth check
        if (persistState?.rehydrated) {
            authCheck(router.asPath);
        }
        // router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            // router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [userReducer?.loggedIn, persistState?.rehydrated])

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => {
        setAuthorized(false)
    };

    function authCheck(url) {

        // redirect to login page if accessing a private page and not logged in
        const publicPaths = ['/login/', '/register/', '/confirm-email/', '/reset-password/'];
        const path = url.split('?')[0];

        // for guarded paths
        if (!publicPaths.includes(path)) {
            console.log('IN GUARDED !!!!')
            if ((userReducer?.loggedIn == false)) {
                router.push({
                    pathname: '/login',
                    query: { returnUrl: router.asPath }
                });
            }
        } else {
            // authorised for pulbic paths
            setAuthorized(true)
        }

        if (userReducer?.loggedIn) {
            setAuthorized(true);
        }


        if (path == '/login/' && userReducer?.loggedIn) {
            router.push({
                pathname: '/listers',
            });
        }
    }

    if (!authorized) {
        return <div>
            <div className={classes['overlay']}>
                <div className={classes['btn']}>Loading</div>

            </div>

        </div>
    }

    return (<>
        {children}
    </>);

}


// export const getStaticProps = wrapper.getStaticProps(store => ({ req, res, ...etc }) => {
//     const userState = store.getState().user
//     console.log("user state ", userState)
//     return {
//         props: { user: userState }
//     }
// });


export default RouteGuard