const uuid = require('uuid')
const path = require('path')
const { Car, Supply, OtherCar } = require('../models/models')
const ApiError = require('../error/ApiError')

class CarController {
    async create(req, res, next) {
        try {
            const { brand, model, year, color, body_type, engine_type, engine_displacement, engine_power, price, info } = req.body

            //fix destructure 
            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest('No image file uploaded'));
            }

            //mb for the cards
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const car = await Car.create({ brand, model, year, color, body_type, engine_type, engine_displacement, engine_power, price, img: fileName })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    Car.create({
                        title: i.title,
                        description: i.description,
                        car_id: car.id
                    })
                )
            }

            return res.json({ car })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let { brand, model, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = parseInt(page) * parseInt(limit) - parseInt(limit);
        let car;
        if (!brand && !model) {
            car = await Car.findAndCountAll({ limit: parseInt(limit), offset })
        }
        if (brand && !model) {
            car = await Car.findAndCountAll({ where: { brand }, limit: parseInt(limit), offset })
        }
        if (!brand && model) {
            car = await Car.findAndCountAll({ where: { model }, limit: parseInt(limit), offset })
        }
        if (brand && model) {
            car = await Car.findAndCountAll({ where: { brand, model }, limit: parseInt(limit), offset })
        }
        return res.json(car)
    }

    async getOne(req, res) {
        const { car_id } = req.params   
        const car = await Car.findOne(
            {
                where: { car_id },
                // include: [{ model: S, as: 'info' }]  
            },
        )
        return res.json(car)
    }
}

module.exports = new CarController()    


// async create(req, res) {
//     const {brand, model, engine_type, engine_power} = req.body
//     const car = await Car.create({brand})
//     return res.json({car})

//     //mb for the cards
//     const {img} = req.files
//     let fileName = uuid.v4() + ".jpg"
//     img.mv(path.resolve(__dirname, '..', 'static', fileName))

//     const car = await Car.create({brand, model, engine_type, engine_power})
// }