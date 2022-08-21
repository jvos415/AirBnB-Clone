from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError

def title_length(form, field):
  title = field.data
  if len(title) > 40:
    raise ValidationError('Title must be 40 characters or less')

def description_length(form, field):
  description = field.data
  if len(description) > 200:
    raise ValidationError('Description must be 200 characters or less')

def address_length(form, field):
  address = field.data
  if len(address) > 60:
    raise ValidationError('Address must be 60 characters or less')

def city_length(form, field):
  city = field.data
  if len(city) > 40:
    raise ValidationError('City must be 40 characters or less')

def state_length(form, field):
  state = field.data
  if len(state) > 40:
    raise ValidationError('State must be 40 characters or less')

def country_length(form, field):
  state = field.data
  if len(state) > 40:
    raise ValidationError('Country must be 40 characters or less')

def price_non_zero(form, field):
  price = field.data
  if price <=  0:
    raise ValidationError('Price must be greater than 0')

def price_max(form, field):
  price = field.data
  if price >  20000:
    raise ValidationError('Price cannot be greater than 20,000 per night.')    


class ListingForm(FlaskForm):
  user_id = IntegerField('User_Id', validators=[DataRequired()])
  title = StringField('Title', validators=[DataRequired("A title is required"), title_length])
  description = StringField('Description', validators=[DataRequired("A description is required"), description_length])
  address = StringField('Address', validators=[DataRequired("An address is required"), address_length])
  city = StringField('City', validators=[DataRequired("A city is required"), city_length])
  state = StringField('State', validators=[DataRequired("A state is required"), state_length])
  country = StringField('Country', validators=[DataRequired("A country is required"), country_length])
  price = FloatField('Price', validators=[DataRequired("A price is required"), price_non_zero, price_max])
  updated_at = StringField('Update_At', validators=[DataRequired()])


class UpdateListingForm(FlaskForm):
  user_id = IntegerField('User_Id', validators=[DataRequired()])
  title = StringField('Title', validators=[DataRequired("A title is required"), title_length])
  description = StringField('Description', validators=[DataRequired("A description is required"), description_length])
  address = StringField('Address', validators=[DataRequired("An address is required"), address_length])
  city = StringField('City', validators=[DataRequired("A city is required"), city_length])
  state = StringField('State', validators=[DataRequired("A state is required"), state_length])
  country = StringField('Country', validators=[DataRequired("A country is required"), country_length])
  price = FloatField('Price', validators=[DataRequired("A price is required"), price_non_zero, price_max])
  updated_at = StringField('Update_At', validators=[DataRequired()])
