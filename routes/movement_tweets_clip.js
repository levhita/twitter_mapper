

	



				/**	for (var user_id in tweets_locations) {
						
						if (user_id === 'length' || !tweets_locations.hasOwnProperty(user_id)){continue;}
						if(tweets_locations[user_id].length==1){continue;}
						
						for (i=0; i<tweets_locations[user_id].length;i++) {
							
							if (tweets_locations[user_id][i].latitude  > region1.latitude && tweets_locations[user_id][i].latitude  < region2.latitude && tweets_locations[user_id][i].longitude > region1.longitude && tweets_locations[user_id][i].longitude < region2.latitude) {

								if (direction=='both') {
									if ( i>0 ) {
										if ( lines.length==0 ) { //first line
											lines.push({
												'start': tweets_locations[user_id][i-1],
												'end': tweets_locations[user_id][i],
											});
										} else if(lines[lines.length-1].end.latitude  !== tweets_locations[user_id][i].latitude && lines[lines.length-1].end.longitude !== tweets_locations[user_id][i].longitude){
											lines.push({
												'start': tweets_locations[user_id][i-1],
												'end': tweets_locations[user_id][i],
											});
										}
									}
								}

								if (direction == 'in') {
									if ( i>0 ) {
										lines.push({
											'start': tweets_locations[user_id][i-1],
											'end': tweets_locations[user_id][i],
										});
									}
								}
								
								if (direction == 'out' || direction == 'both') {
									if ( i<tweets_locations[user_id].length-1 ) {
										lines.push({
											'start': tweets_locations[user_id][i],
											'end': tweets_locations[user_id][i+1],
										});
									}
								}
							}
						}
					}
					**/




					if (typeof region1 !== 'undefined') { 

					} else {
						for (var user_id in tweets_locations) {

							if (user_id === 'length' || !tweets_locations.hasOwnProperty(user_id)) {continue;} 
							if(tweets_locations[user_id].length==1) {continue;} 
							for(i=1; i<tweets_locations[user_id].length;i++) {
								lines.push({
									'start': tweets_locations[user_id][i-1],
									'end': tweets_locations[user_id][i],
								});
							}
						}
					}