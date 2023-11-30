class LoginController < ApplicationController

  def login

  end

  def loginPost
    @email = params[:email]
    @user = Admin.find_by(email: @email) || Manager.find_by(email: @email) || Employee.find_by(email: @email)
    password = params[:password]

    if @user&.authenticate(password)
      redirect_to dashboard_path
    else
      puts "Validation errors: #{@user.errors.full_messages}"
      flash[:alert] = @user.errors.full_messages
      return
    end
  end

  def Dashboard

  end
end
