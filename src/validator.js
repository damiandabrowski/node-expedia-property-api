/**
 * Created by Damian Dąbrowski
 *
 * @author Damian Dąbrowski <dabrowski1983@gmail.com>
 *
 */
"use strict";

const Joi = require('joi');

module.exports = {
    providerPropertyId: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    providerPropertyUrl: Joi.string().min(3).required(),
    structureType: Joi.string().default('Hotel').optional(),
    currencyCode: Joi.string().min(2).required(),
    billingCurrencyCode: Joi.string().min(2).required(),
    timeZone: Joi.string().min(3).required(),
    addresses: Joi.array().min(1).items(
        Joi.object().keys(
            {
                line1: Joi.string().required(),
                line2: Joi.string().optional(),
                city: Joi.string().required(),
                countryCode: Joi.string().required(),
                state: Joi.string().optional(),
                postalCode: Joi.string().optional()
            }
        )
    ),
    contacts: Joi.object().keys({
        Property: Joi.object().keys({
            phoneNumbers: Joi.array().min(1).items(Joi.object())
        }).required(),
        ReservationManager: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            emails: Joi.array().min(1).items(Joi.string()).required(),
            phoneNumbers: Joi.array().min(1).items(Joi.object())
        }).required(),
        AlternateReservationManager: Joi.object().optional(),
        GeneralManager: Joi.object().optional(),
        PropertyExtranetUser: Joi.object().optional()
    }).required(),
    ratings: Joi.array().items(Joi.object()).optional(),
    taxes: Joi.array().items(Joi.object()).optional(),
    propertyCollectedMandatoryFees: Joi.array().items(Joi.object()).optional(),
    policies: Joi.array().optional(),
    contents: Joi.array().optional(),
    inventorySettings: Joi.object().optional(),
    attributes: Joi.array().items(Joi.object()).optional()
};