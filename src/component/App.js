/* Requirement */
import React, { Suspense } from 'react';
import {
    HashRouter,
    Switch,
    Route,
} from "react-router-dom";

/* Import */
import './App.css'

/* Component */
import Navbar from './Navbar';
import Footer from './Footer';
import Loading from '../page/Loading/Loading';
import NotFound from '../page/NotFound/NotFound';

const Home = React.lazy(() => import('../page/Home/Home'));
const LiveABC = React.lazy(() => import('../page/LiveABC/LiveABC'));

class SuspenseFallback extends React.Component {
    render() {
        return (
            <div>
                <Loading />
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <HashRouter hashType="noslash">
                <Suspense fallback={<SuspenseFallback />}>

                    <Switch>
                        <Route exact path="/LiveABC">
                            <Navbar defaultRoute="/" />
                            <LiveABC />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route component={NotFound} />
                    </Switch>

                    <Footer />
                </Suspense>
            </HashRouter>
        );
    }
}

export default App;
