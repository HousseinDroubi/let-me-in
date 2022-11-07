<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */

    // In this middleware, the condition is that who want to ask for a route in the scope of admin middleware must
    // be only of id = '1'
    public function handle(Request $request, Closure $next){
          
        if(auth('api')->user()->id!='1')
            return redirect()->route('access-denied');
        return $next($request);
    }
}
