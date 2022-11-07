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

    public $username,$arrival_time,$car_plate_number;
    
    public function __construct($username,$arrival_time,$car_plate_number){

        $this->username = $username;
        $this->arrival_time = $arrival_time;
        $this->car_plate_number = $car_plate_number;
    }

    public function envelope(){

        return new Envelope(
            subject: 'Acknowledgement',
        );
    }

    public function content(){

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
