(define (move N from to spare)
	(if (= N 0)
		(display "")
		(begin
			(move (- N 1) from spare to)
			(display "move from ")(display from)(display " to ")(display to)(display ".\n")
			(move (- N 1) spare to from)
			)))

(move 3 'A 'B 'C)
