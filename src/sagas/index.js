import { all, fork } from 'redux-saga/effects';
import authentication from './authentication';
import socialNetwork from './module';

export default function* rootSaga() {
    yield all([
        fork(authentication),
        fork(socialNetwork),
    ]);
}