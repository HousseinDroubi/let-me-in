<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Acknowledgement extends Mailable
{
    use Queueable, SerializesModels;
    // In this class, we need 'username', 'arrival_time' and 'car_plate_number' 
    // in order to pass them to the acknowledgement blade.
    public $username,$arrival_time,$car_plate_number;

    public function __construct($username,$arrival_time,$car_plate_number){

        $this->username = $username;
        $this->arrival_time = $arrival_time;
        $this->car_plate_number = $car_plate_number;
    }

    public function envelope(){
        
        //Subject of the gmail
        return new Envelope(
            subject: 'Acknowledgement',
        );
    }

    public function content(){

        // The form that must be sent to an email
        return new Content(
            markdown: 'emails.acknowledgements',
        );
    }

    public function attachments(){

        return [];
    }

    public function build(){

        return $this->subject('Acknowledgement')
        ->markdown('emails.acknowledgements');
    }
}
