/**
 * Created by Damian Dąbrowski
 *
 * @author Damian Dąbrowski <dabrowski1983@gmail.com>
 *
 */
"use strict";

const Axios = require('axios');
const _ = require('underscore');
const Joi = require('joi');
const validationSchema = require('./validator');

class ExpediaPropertyApi {
    constructor(options)
    {
        let defaults = {
            api: "https://services.expediapartnercentral.com",
            account: false,
            username: false,
            password: false,
            test: false,
            validateOnboarding: true
        };
        this.options = _.extend(defaults, options);

        if (this.options.api === false) throw new Error("API url is required!");
        if (this.options.username === false) throw new Error("Username is required!");
        if (this.options.password === false) throw new Error("Password is required!");
        if (this.options.account === false) throw new Error("Account is required!");

        if (this.options.test === true) {
            this.options.api = "https://int.services.expediapartnercentral.com";
        }

        this._axiosInstance = Axios.create({
            baseURL: this.options.api,
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: this.options.username,
                password: this.options.password
            },
            validateStatus: status=>{
                return (status >= 200 && status < 300) || status >= 401;
            }

        });
        this._axiosInstance.defaults.transformResponse.push(function (data) {
            if (_.has(data, 'entity'))
                return data.entity;
            return data;
        });
    }

    _prepareCall(method, url, data) {
        let opt = {
            method: method || 'get',
            url: url
        };
        if (data && _.isObject(data))
        {
            opt.data = data;
        }
        return this._axiosInstance(opt);
    }

    setPropertyDetails(data)
    {
        let url = `properties/v1/${this.options.account}`;

        if (!_.isObject(data) || _.isArray(data) || (_.isArray(data) && data.length<1))
        {
            throw new Error("Nothing to onboard!");
        }

        if (!_.isArray(data) )
        {
            data = [data];
        }

        if (this.options.validateOnboarding === true)
        {
            let errors = [];
            data.forEach(item=>{
                let result = Joi.validate(item, validationSchema);
                if ( result.error )
                {
                    errors.push(result.error);
                }
            });
            if (errors.length>0)
                throw Error(errors);
        }
        return this._prepareCall('put', url, data);
    }

    getPropertyDetails(provider_property_id)
    {
        let url = `properties/v1/${this.options.account}/${provider_property_id}`;
        return this._prepareCall('get', url);
    }

    getPropertyStatus(provider_property_id)
    {
        let url = `properties/v1/${this.options.account}/${provider_property_id}/status`;
        return this._prepareCall('get', url);
    }

    updateProperty(provider_property_id, data)
    {
        // Currenty PATCH is not supported
        return this.setPropertyDetails(data);
    }

    deactivateProperty(provider_property_id)
    {
        let url = `properties/v1/${this.options.account}/${provider_property_id}`;
        return this._prepareCall('delete', url);
    }
};
module.exports = ExpediaPropertyApi;