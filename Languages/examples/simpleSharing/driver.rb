require './mob.rb'

#Create players
def read_mobs(file)
	mobs = []
	File.open(file, 'r') do |file|
		args = []
		while line = file.gets
			line.rstrip!
			if(line == "---")
				mobs << Mob.new(args[0], args[1].to_i)
				args = []
			else
				args << line
			end
		end
		mobs << Mob.new(args[0], args[1].to_i) if args.length > 0
	end
end

#Create items
def read_items(file)
	items = []
	File.open(file, 'r') do |file|
		args = []
		while line = file.gets
			line.rstrip!
			if(line == "---")
				items << Item.new(args[0], args[1].to_i)
				args = []
			else
				args << line
			end
		end
		items << Item.new(args[0], args[1].to_i) if args.length > 0
	end
end

mobs = read_mobs("mobs.txt")
items = read_items("items.txt")

mobs[0].holding = items[0]

#Initial conditions
puts mobs

puts "---"
puts "Passing Item"
puts "---"

mobs[0].give_item(mobs[1])

puts mobs
