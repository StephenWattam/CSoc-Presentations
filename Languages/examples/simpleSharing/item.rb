class Item
	
	attr_accessor :name, :mod

	def initialize(name, mod)
		@name = name
		@mod = mod
	end

	def to_s
		return @name
	end
end
