import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import * as Constants from '../constants/Constants';
import { getItemValues } from '../utilities/FilterUtility';

export const useNoticeCount = () => {
    const [ noticeCount, setNoticeCount ] = useState(0);
    const history = useHistory();

    useEffect(() => {
        async function getNoticeCount() {
            const access_token = window.sessionStorage.getItem('access_token');
    
            if(!access_token) {
                console.log('There has no access_token. Go back to the login page.');
    
                history.push('/login');
            }
            
            try {
                const response = await axios.get(`${Constants.HOME_URL}/user?access_token=${access_token}`);
                
                const { data: { notice_cnt } } = response;
                setNoticeCount(notice_cnt);
            } catch(exception) {
                console.log('Token has an exception while get informations. Re-login please.');
    
                history.push('/login');
            }
        }
        
        getNoticeCount();
    }, []);

    return noticeCount;
}

export const useNoticeList = (page, filters) => {
    const [ noticeList, setNoticeList ] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function getNoticeList() {
            const access_token = window.sessionStorage.getItem('access_token');
    
            if(!access_token) {
                console.log('There has no access_token. Go back to the login page.');
    
                history.push('/login');
            }
            
            try {
                const { dates, regions, locations, models, types } = filters;

                const response = await axios.get(`${Constants.HOME_URL}/notices`, {
                    params: {
                        access_token,
                        page,
                        start: dates[0].startDate,
                        end: dates[0].endDate,
                        regions: getItemValues(regions),
                        locations: getItemValues(locations),
                        models: getItemValues(models),
                        types: getItemValues(types),
                    },
                });
                
                const newNoticeList = response.data.map((data, index) => ({
                    no: index + 1,
                    ...data,
                }));

                setNoticeList(newNoticeList);
            } catch(exception) {
                console.log('Token has an exception while get informations. Re-login please.');
    
                history.push('/login');
            }
        }
    
        getNoticeList();
    }, [page, filters]);

    return noticeList;
}

export const filtersReducer = (state, action) => {
    switch(action.type) {
        case 'ranges':
        case 'dates':
            return { ...state, [action.type]: action.value };
        
        case 'regions':
            const newRegions = state[action.type].map(iterator => (
                iterator.id === action.value
                    ? { ...iterator, selected: !iterator.selected }
                    : iterator
            ));
            return { ...state, regions: newRegions };
        
        case 'locations':
        case 'models':
        case 'types':
            const newStates = state[action.type].map(iterator => (
                iterator.value === action.value
                    ? { ...iterator, selected: !iterator.selected }
                    : iterator
            ));
            return { ...state, [action.type]: newStates };
        
        default:
            throw new Error(`unexpected action type: ${action.type}`);
    }
};