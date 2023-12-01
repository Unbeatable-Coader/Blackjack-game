class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    puts "User role: #{user.usertype}"
# hello
    if user.admin?
      can :manage, :all
    elsif user.manager?
      can :manage, Task, manager_id: user.id
      can :read, Task, user_id: user.id
    else
      can :read, Task, user_id: user.id
    end
  end
end
