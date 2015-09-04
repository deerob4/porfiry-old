import express from 'express';

import Form from '../models/Form';

let router = express.Router();

/**
 * GET /api/forms
 * Returns all forms.
 */
router.get('/', (req, res) => {
  Form.find({}, '-__v', (err, forms) => {
    if (err) throw err;
    res.send({ forms });
  });
});

/**
 * POST /api/forms
 * Adds a new form to the database.
 */
router.post('/', (req, res) => {
  let form = new Form();

  form.house = req.body.house;
  form.year = req.body.year;

  form.save(err => {
    if (err) throw err;
    res.send({ message: form + ' was saved!' });
  });
});

/**
 * GET /api/forms/:id
 * Returns a specific form.
 * @param  {formId} id The id of the form to return.
 */
router.get('/:formId', (req, res) => {
  Form.findById(req.params.formId, (err, form) => {
    if (err) throw err;
    res.send(form);
  });
});

/**
 * PUT /api/forms/:id
 * Updates a specific form.
 * @param  {Object_id} id The id of the form to update.
 */
router.put('/:formId', (req, res) => {
  Form.findById(req.params.formId, (err, form) => {
    if (err) throw err;

    for (let property in req.body) {
      form[property] = req.body[property];
    }
    
    form.save(err => {
      if (err) throw err;
      res.send({ message: 'Form group updated!', form });
    });
  });
});

/**
 * DELETE /api/forms/:id
 * Deletes a specific form.
 * @param  {Object_id} id The id of the form to delete.
 */
router.delete('/:formId', (req, res) => {
  Form.remove(req.params.formId, (err, form) => {
    if (err) throw err;
    res.send({ message: 'Form group was deleted!' });
  });
});

export default router;
