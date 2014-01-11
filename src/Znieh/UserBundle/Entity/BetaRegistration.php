<?php

namespace Znieh\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * BetaRegistration
 *
 * @ORM\Table()
 * @ORM\Entity
 * @UniqueEntity(
 *     fields={"email"},
 *     message="Vous êtes déjà inscrit !"
 * )
 */
class BetaRegistration
{
    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255)
     * @ORM\Id
     * @Assert\Email(
     *     message = "'{{ value }}' n'est pas un email valide.",
     *     checkMX = true
     * )
     */

    private $email;

    /**
     * Set email
     *
     * @param string $email
     * @return BetaRegistration
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }
}
