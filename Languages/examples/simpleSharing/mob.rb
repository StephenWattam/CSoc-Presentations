require './item.rb'

class Mob

	attr_accessor :name, :hp, :holding

	def initialize(name, hp, holding=nil)
		@name = name
		@hp = hp
		@holding = holding
	end

	def hp
		return (holding.nil?) ? @hp : @hp + holding.mod
	end

	def to_s
		return "Name: #{@name}, HP: #{hp}, Holding: #{holding.nil? ? "(nothing)": holding}"
	end

	def give_item(mob)
		if !(@holding.nil?)
			item = @holding
			@holding = nil
			mob.holding = item
		end
	end
end
