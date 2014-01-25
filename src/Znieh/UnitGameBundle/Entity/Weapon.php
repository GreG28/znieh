<?php

namespace Znieh\UnitGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Validator\ExecutionContextInterface;

/**
 * Weapon
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Znieh\UnitGameBundle\Entity\WeaponRepository")
 * @Assert\Callback(methods={"isWeaponValid"})
 */

class Weapon
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
     * @ORM\ManyToOne(targetEntity="Znieh\UserBundle\Entity\User", inversedBy="weapons", cascade={"persist"})
     */
    private $user;

    /**
    * @ORM\ManyToMany(targetEntity="Znieh\VillageGameBundle\Entity\WeaponPart", cascade={"persist"})
    */
    private $parts;

    /**
     * @ORM\ManyToOne(targetEntity="Znieh\VillageGameBundle\Entity\WeaponType", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $type;

    public function __toString()
    {
        return ' 11';
    }

    public function isWeaponValid(ExecutionContextInterface $context)
    {
        foreach ($parts as $part) {
            if ($part->getType() != $this->type) {
                $context->addViolationAt('parts', 'Ne correspond pas au type!', array(), null);
            }
        }
    }

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
     * Constructor
     */
    public function __construct()
    {
        $this->parts = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set user
     *
     * @param \Znieh\UserBundle\Entity\User $user
     *
     * @return Weapon
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

    /**
     * Add parts
     *
     * @param \Znieh\VillageGameBundle\Entity\WeaponPart $parts
     *
     * @return Weapon
     */
    public function addPart(\Znieh\VillageGameBundle\Entity\WeaponPart $parts)
    {
        $this->parts[] = $parts;

        return $this;
    }

    /**
     * Remove parts
     *
     * @param \Znieh\VillageGameBundle\Entity\WeaponPart $parts
     */
    public function removePart(\Znieh\VillageGameBundle\Entity\WeaponPart $parts)
    {
        $this->parts->removeElement($parts);
    }

    /**
     * Get parts
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getParts()
    {
        return $this->parts;
    }

    /**
     * Set type
     *
     * @param \Znieh\VillageGameBundle\Entity\WeaponType $type
     *
     * @return Weapon
     */
    public function setType(\Znieh\VillageGameBundle\Entity\WeaponType $type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return \Znieh\VillageGameBundle\Entity\WeaponType
     */
    public function getType()
    {
        return $this->type;
    }
}
