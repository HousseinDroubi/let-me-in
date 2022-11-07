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
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($username,$arrival_time,$car_plate_number)
    {
        $this->username = $username;
        $this->arrival_time = $arrival_time;
        $this->car_plate_number = $car_plate_number;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Acknowledgement',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            markdown: 'emails.acknowledgements',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }

    public function build()
    {
        return $this->subject('Acknowledgement')
        ->markdown('emails.acknowledgements');
    }
}
