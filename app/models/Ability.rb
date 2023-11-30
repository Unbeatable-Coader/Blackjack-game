class Ability
  include CanCan::Ability

  def initialize(user)
    @user = user || Admin.new || Manager.new || Employee.new

    if @user.has_role?(:Admin)
      can :manage, :all
    elsif @user.has_role?(:Manager)
      can :manage, Task, manager_id: @user.id
      can :update, Task, status: 'In Review', manager_id: @user.id
    elsif @user.has_role?(:Employee)
      can [:read], Task, user_id: @user.id
    end
  end
end
