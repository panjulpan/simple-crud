const User = require('../models/User');

class UserController {
  static getExample = (req, res) => {
    res.status(200).json({ message: 'Hello World!' })
  };

  static getUsers = (req, res) => {
    User.find({}, 'nik name email -_id', (err, users) => {
      if (err) return res.status(500).json({
        'code': 500,
        'message': 'Internal server error'
      })

      return res.status(200).send({
        'code': 200,
        'message': 'Success',
        'data': users
      });
    })
  };

  static postUser = (req, res) => {
    const user = new User(req.body);

    User.findOne(
      {nik: req.body.nik},
      (e, data) => {
        if (e) {
            return res.status(500).json({
                'code': 500,
                'message': 'Internal server error'
            });
        }
        
        if (data) {
            return res.status(403).json({
                'code': 403,
                'message': 'Forbidden'
            });
        }

        user.save(err => {
          if (err) {
            if (err.name === 400 || err.statusCode === 11000) {
              return res.status(500).json({
                  'code': 400,
                  'message': 'Bad request'
              });
            }
            if (err.statusCode===500) {
              return res.status(500).json({
                  'code': 500,
                  'message': 'Internal server error'
              });
            }
          }
            
          return res.status(201).json({
              'code': 201,
              'message': 'Created'
          });
        });
      }
    )
  };

  static getUserNik = (req, res) => {
    User.findOne(
      {nik: req.params.nik},
      'nik name email -_id',
      (err, user) => {
        if (err) return res.status(500).json({
          'code': 500,
          'message': 'Internal server error'
        })

        if (!user) {
          return res.status(404).send({
            'code': 404,
            'message': 'Not found'
          });
        }
        
        return res.status(200).send({
          'code': 200,
          'message': 'Success',
          'data': user
        });
    });
  };

  static editUser = (req, res) => {
    User.findOneAndUpdate(
      {nik: req.params.nik},
      {
        name: req.body.name,
        email: req.body.email
      },
      (e, data) => {
        if (e) {
            return res.status(500).send({
                code: 500,
                message: 'Internal server error'
            });
        }

        if (!data) {
            return res.status(404).send({
                code: 404,
                message: 'Not found'
            });
        }

        return res.status(200).send({
            code: 200,
            message: 'Ok'
        });
      }
    )
  }

  static deleteUser = (req, res) => {
    User.findOneAndRemove(
        {nik: req.params.nik},
        (e, data) => {
          if (e) {
              return res.status(500).send({
                  code: 500,
                  message: 'Internal server error'
              });
          }
  
          if (!data) {
              return res.status(404).send({
                  code: 404,
                  message: 'Not found'
              });
          }
  
          return res.status(200).send({
              code: 200,
              message: 'Ok'
          });
        }
      )
  }
}

export default UserController;