<?php

namespace Znieh\InfractionGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Infraction
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class Infraction
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(name="createdAt", type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="InfractionType")
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity="Znieh\UserBundle\Entity\User")
     */
    private $user;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Infraction
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set type
     *
     * @param \Znieh\InfractionGameBundle\Entity\InfractionType $type
     *
     * @return Infraction
     */
    public function setType(\Znieh\InfractionGameBundle\Entity\InfractionType $type = null)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return \Znieh\InfractionGameBundle\Entity\InfractionType
     */
    public function getType()
    {
        return $this->type;
    }



    /**
     * Set user
     *
     * @param \Znieh\UserBundle\Entity\User $user
     *
     * @return Infraction
     */
    public function setUser(\Znieh\UserBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Znieh\UserBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }
}
