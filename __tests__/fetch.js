import {
    expect
} from 'chai';
import dummyData from '../src/api/dummydata.js';

global.fetch = jest.fn().mockImplementation(() => {
    var p = new Promise((resolve, reject) => {
      resolve({
        json: function() { 
          return dummyData;
        }
      });
    });
    return p;
});

const fetchApi = require('../src/api/fetch');
const mainUrl = 'https://sandbox.glofox.com/2.0/members?page=1&limit=10';
const mainState = {
    isLoading: false,
    isLoadingTail: true,
    onEndReachedCalledDuringMomentum: true,
    endReached: false,
    searchParam: "Needle",
    page: 1,
    limit: 10,
    dataElements: [],
    refreshing: false
}

describe('Testing main url generation', () => {
    it('should return the main url', () => {
        fetchApi.setState(mainState);
        expect(fetchApi.constructMainUrl()).to.equal(mainUrl);
    });
});

describe('Testing multiple url generation', () => {
    it('should create an url for name and lastname', () => {
        expect(fetchApi.constructOptions(mainUrl)).to.have.length(2);
    });
    it('should create an url for email', () => {
        fetchApi.setState({
            searchParam: "test@test.com"
        });
        expect(fetchApi.constructOptions(mainUrl)).to.have.length(1);
    });
    it('should create an url for email', () => {
        fetchApi.setState({
            searchParam: "Name Surname"
        });
        expect(fetchApi.constructOptions(mainUrl)).to.have.length(3);
    });
});

describe('Fetch data from server', () => {
    it('should return dataset', (done) => {
      fetchApi.collectData(mainState, (data) => {
            (data.data.length===10) ? done():done('Dataset length doesn\'t match');
        });
        
    });
});
