from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError

def review_length(form, field):
  review = field.data
  if len(review) > 200:
    raise ValidationError('Review must be 200 characters or less.')

def rating_value_max(form, field):
  rating = field.data
  if rating > 5:
    raise ValidationError('Rating must be between the values of 1 and 5.')

def rating_value_min(form, field):
  rating = field.data
  if rating < 1:
    raise ValidationError('Rating must be between the values of 1 and 5.')

class ReviewForm(FlaskForm):
  user_id = IntegerField('User_Id', validators=[DataRequired()])
  listing_id = IntegerField('Listing_Id', validators=[DataRequired()])
  review = StringField('Review', validators=[DataRequired(), review_length])
  rating = FloatField('Rating', validators=[DataRequired(), rating_value_max, rating_value_min])
  updated_at = StringField('Update_At', validators=[DataRequired()])


class UpdateReviewForm(FlaskForm):
  user_id = IntegerField('User_Id', validators=[DataRequired()])
  listing_id = IntegerField('Listing_Id', validators=[DataRequired()])
  review = StringField('Review', validators=[DataRequired(), review_length])
  rating = FloatField('Rating', validators=[DataRequired(), rating_value_max, rating_value_min])
  updated_at = StringField('Update_At', validators=[DataRequired()])
